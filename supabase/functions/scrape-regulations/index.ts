// supabase/functions/scrape-regulations/index.ts
// Replaces Base44's scrapeRegulations function
// Runs as a Supabase Edge Function (Deno)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// ── Sources ──────────────────────────────────────────────────────────
const SOURCES = [
  { name: "CSSF", url: "https://www.cssf.lu/en/publications/?cat=circulars", label: "CSSF Circulars" },
  { name: "CSSF", url: "https://www.cssf.lu/en/publications/?cat=communiques", label: "CSSF Communiqués" },
  { name: "ESMA", url: "https://www.esma.europa.eu/press-news/esma-news", label: "ESMA News" },
  { name: "ALFI", url: "https://www.alfi.lu/en-gb/news-and-events/news", label: "ALFI News" },
  { name: "LPEA", url: "https://www.lpea.lu/news/", label: "LPEA News" },
];

const ENTITY_TYPE_IDS = [
  "aifm", "manco", "super-manco", "law-firm",
  "reg-service", "fund-promoter", "depositary", "other",
];

const VALID_TOPICS = [
  "Valuation", "Compliance", "Fund Law", "IT / Technology",
  "Risk Management", "ESG / Sustainability", "Operations",
  "Reporting", "AML/CFT", "Other",
];
const VALID_RELEVANCE = ["high", "medium", "low"];

// ── Helpers ──────────────────────────────────────────────────────────
async function fetchWithRetry(url: string, retries = 2): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; LetzComply/1.0)" },
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) { if (attempt === retries) return null; continue; }
      return res;
    } catch (_err) {
      if (attempt === retries) return null;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return null;
}

async function fetchPageText(url: string): Promise<string | null> {
  const res = await fetchWithRetry(url);
  if (!res) return null;
  const html = await res.text();
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12_000);
}

// ── Claude API wrapper ───────────────────────────────────────────────
async function callClaude(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<Record<string, unknown>> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Claude API error ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || "{}";

  // Extract JSON from the response (handle markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  try {
    return JSON.parse(jsonMatch[1]!.trim());
  } catch {
    // Try to find JSON object directly
    const objMatch = text.match(/\{[\s\S]*\}/);
    if (objMatch) return JSON.parse(objMatch[0]);
    throw new Error(`Failed to parse Claude response as JSON: ${text.slice(0, 200)}`);
  }
}

// ── Main handler ─────────────────────────────────────────────────────
Deno.serve(async (req) => {
  try {
    // Auth: allow scheduled invocations (with service role) or admin calls
    const authHeader = req.headers.get("Authorization");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");

    if (!anthropicKey) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = { processed: 0, new: 0, errors: [] as string[] };
    const today = new Date().toISOString().split("T")[0];

    // ── Process one source ─────────────────────────────────────────
    async function processSource(source: typeof SOURCES[0]) {
      const pageText = await fetchPageText(source.url);
      if (!pageText) {
        results.errors.push(`Failed to fetch ${source.url}`);
        return;
      }

      // Step 1: Extract items from the page
      const extracted = await callClaude(
        anthropicKey!,
        "You are a regulatory data extraction assistant. Always respond with valid JSON only, no markdown or explanation.",
        `You are analysing the publications page of ${source.label} (${source.url}).
Extract the most recent regulatory publications, circulars, FAQs, or news items from this page content.
For each item found, extract: title, date (YYYY-MM-DD format), a short description if available, and a source_id (circular number, or a slug derived from the title).
Only include items from the last 180 days relative to today (${today}).
Return at most 10 items.

Respond with JSON in this exact format:
{"items": [{"title": "...", "date": "YYYY-MM-DD", "description": "...", "source_id": "..."}]}

Page content:
${pageText}`,
      );

      const items = ((extracted?.items as Array<Record<string, string>>) || []).filter(
        (i) => i.title && /^\d{4}-\d{2}-\d{2}$/.test(i.date),
      );
      results.processed += items.length;

      // Step 2: Check for duplicates
      const newItems: Array<Record<string, string>> = [];
      for (const item of items) {
        const sourceId = item.source_id || item.title;
        const { data: existing } = await supabase
          .from("regulations")
          .select("id")
          .eq("source_id", sourceId)
          .limit(1);

        if (!existing || existing.length === 0) {
          newItems.push(item);
        }
      }

      // Step 3: Analyse and store new items
      for (const item of newItems) {
        const analysis = await callClaude(
          anthropicKey!,
          "You are a Luxembourg fund regulation expert. Always respond with valid JSON only, no markdown or explanation.",
          `Analyse this regulatory publication and produce a structured analysis.

Publication:
Source: ${source.name}
Title: ${item.title}
Date: ${item.date}
Description: ${item.description || "N/A"}

Produce a JSON object with these fields:
- topic: one of "Valuation", "Compliance", "Fund Law", "IT / Technology", "Risk Management", "ESG / Sustainability", "Operations", "Reporting", "AML/CFT", "Other"
- relevance: "high", "medium", or "low" based on how significant/urgent this is for Luxembourg fund managers
- summary: 1-2 sentence plain English summary (max 200 chars)
- fullDetail: 3-5 sentences of detailed explanation of what this means practically
- aiSummary: 2-3 sentence concise summary suitable for a professional audience
- entity_relevance: array of entity types this is relevant to, from: aifm, manco, super-manco, law-firm, reg-service, fund-promoter, depositary, other
- function_insights: object with keys valuation, compliance, risk, accounting, it, fund-law, aml, investor-relations, operations, oversight, portfolio-management, tax — each containing:
  - headline: short headline (max 80 chars)
  - explanation: 2-3 sentences explaining what this means for that function
  - actions: array of 2-3 specific action items

Respond with valid JSON only.`,
        );

        const topic = VALID_TOPICS.includes(analysis.topic as string)
          ? analysis.topic
          : "Other";
        const relevance = VALID_RELEVANCE.includes(analysis.relevance as string)
          ? analysis.relevance
          : "medium";

        const { error: insertError } = await supabase.from("regulations").insert({
          title: item.title,
          source: source.name,
          date: item.date,
          url: source.url,
          source_id: item.source_id || item.title,
          topic,
          relevance,
          summary: (analysis.summary as string) || item.description || "",
          full_detail: (analysis.fullDetail as string) || "",
          ai_summary: (analysis.aiSummary as string) || "",
          entity_relevance: (analysis.entity_relevance as string[]) || ENTITY_TYPE_IDS,
          function_insights: analysis.function_insights || {},
          notified: false,
        });

        if (insertError) {
          results.errors.push(`Insert failed for "${item.title}": ${insertError.message}`);
        } else {
          results.new++;
        }
      }
    }

    // Process all sources (sequentially to stay within rate limits)
    for (const source of SOURCES) {
      try {
        await processSource(source);
      } catch (err) {
        results.errors.push(`${source.label}: ${(err as Error).message}`);
      }
    }

    return Response.json({ success: true, ...results });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
});
