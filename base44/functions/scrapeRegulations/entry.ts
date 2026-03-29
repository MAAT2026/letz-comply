import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

const SOURCES = [
  {
    name: "CSSF",
    url: "https://www.cssf.lu/en/publications/?cat=circulars",
    label: "CSSF Circulars"
  },
  {
    name: "CSSF",
    url: "https://www.cssf.lu/en/publications/?cat=communiques",
    label: "CSSF Communiqués"
  },
  {
    name: "ESMA",
    url: "https://www.esma.europa.eu/press-news/esma-news",
    label: "ESMA News"
  },
  {
    name: "ALFI",
    url: "https://www.alfi.lu/en-gb/news-and-events/news",
    label: "ALFI News"
  },
  {
    name: "LPEA",
    url: "https://www.lpea.lu/news/",
    label: "LPEA News"
  }
];

const FUNCTION_IDS = [
  "valuation", "compliance", "risk", "accounting", "it", "fund-law",
  "aml", "investor-relations", "operations", "oversight", "portfolio-management", "tax"
];
const ENTITY_TYPE_IDS = ["aifm", "manco", "super-manco", "law-firm", "reg-service", "fund-promoter", "depositary", "other"];

async function fetchWithRetry(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; RegWise/1.0)" },
        signal: AbortSignal.timeout(15000)
      });
      if (!res.ok) {
        if (attempt === retries) return null;
        continue;
      }
      return res;
    } catch (err) {
      if (attempt === retries) return null;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return null;
}

async function fetchPageText(url) {
  const res = await fetchWithRetry(url);
  if (!res) return null;
  const html = await res.text();
  // Strip HTML tags to get readable text
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
             .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
             .replace(/<[^>]+>/g, ' ')
             .replace(/\s+/g, ' ')
             .trim()
             .slice(0, 12000);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Allow scheduled (no auth) or admin user
    let isAdmin = false;
    try {
      const user = await base44.auth.me();
      isAdmin = user?.role === 'admin';
    } catch (_) {
      // called from scheduler — use service role
    }

    const results = { processed: 0, new: 0, errors: [] };
    const today = new Date().toISOString().split('T')[0];

    const VALID_TOPICS = ["Valuation", "Compliance", "Fund Law", "IT / Technology", "Risk Management", "ESG / Sustainability", "Operations", "Reporting", "AML/CFT", "Other"];
    const VALID_RELEVANCE = ["high", "medium", "low"];

    async function processSource(source) {
      const pageText = await fetchPageText(source.url);
      if (!pageText) {
        results.errors.push(`Failed to fetch ${source.url}`);
        return;
      }

      const extracted = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are analysing the publications page of ${source.label} (${source.url}).
Extract the most recent regulatory publications, circulars, FAQs, or news items from this page content.
For each item found, extract: title, date (YYYY-MM-DD format), a short description if available, and a source_id (circular number, or a slug derived from the title).
Only include items from the last 180 days relative to today (${today}).
Return at most 10 items.

Page content:
${pageText}`,
        response_json_schema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  date: { type: "string" },
                  description: { type: "string" },
                  source_id: { type: "string" }
                }
              }
            }
          }
        }
      });

      const items = (extracted?.items || []).filter(i => i.title && /^\d{4}-\d{2}-\d{2}$/.test(i.date));
      results.processed += items.length;

      // Check existing and filter out duplicates in parallel
      const existingChecks = await Promise.all(
        items.map(item => base44.asServiceRole.entities.Regulation.filter({ source_id: item.source_id || item.title }))
      );
      const newItems = items.filter((_, idx) => !existingChecks[idx]?.length);

      // Analyse all new items in parallel
      await Promise.all(newItems.map(async (item) => {
        const analysis = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `You are a Luxembourg fund regulation expert. Analyse this regulatory publication and produce a structured analysis.

Publication:
Source: ${source.name}
Title: ${item.title}
Date: ${item.date}
Description: ${item.description || 'N/A'}

Produce:
1. topic: one of "Valuation", "Compliance", "Fund Law", "IT / Technology", "Risk Management", "ESG / Sustainability", "Operations", "Reporting", "AML/CFT", "Other"
2. relevance: "high", "medium", or "low" based on how significant/urgent this is for Luxembourg fund managers
3. summary: 1-2 sentence plain English summary (max 200 chars)
4. fullDetail: 3-5 sentences of detailed explanation of what this means practically
5. aiSummary: 2-3 sentence concise summary suitable for a professional audience
6. entity_relevance: array of entity types this is relevant to, from: aifm, manco, super-manco, law-firm, reg-service, fund-promoter, depositary, other
7. function_insights: object with keys valuation, compliance, risk, accounting, it, fund-law, aml, investor-relations, operations, oversight, portfolio-management, tax — each containing:
   - headline: short headline (max 80 chars)
   - explanation: 2-3 sentences explaining what this means for that function
   - actions: array of 2-3 specific action items`,
          response_json_schema: {
            type: "object",
            properties: {
              topic: { type: "string" },
              relevance: { type: "string" },
              summary: { type: "string" },
              fullDetail: { type: "string" },
              aiSummary: { type: "string" },
              entity_relevance: { type: "array", items: { type: "string" } },
              function_insights: {
                type: "object",
                properties: {
                  valuation: { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  compliance: { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  risk: { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  accounting: { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  it: { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "fund-law": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "aml": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "investor-relations": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "operations": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "oversight": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "portfolio-management": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } },
                  "tax": { type: "object", properties: { headline: { type: "string" }, explanation: { type: "string" }, actions: { type: "array", items: { type: "string" } } } }
                }
              }
            }
          }
        });

        const topic = VALID_TOPICS.includes(analysis.topic) ? analysis.topic : "Other";
        const relevance = VALID_RELEVANCE.includes(analysis.relevance) ? analysis.relevance : "medium";

        await base44.asServiceRole.entities.Regulation.create({
          title: item.title,
          source: source.name,
          date: item.date,
          url: source.url,
          source_id: item.source_id || item.title,
          topic,
          relevance,
          summary: analysis.summary || item.description || "",
          fullDetail: analysis.fullDetail || "",
          aiSummary: analysis.aiSummary || "",
          entity_relevance: analysis.entity_relevance || ENTITY_TYPE_IDS,
          function_insights: analysis.function_insights || {},
          notified: false
        });

        results.new++;
      }));
    }

    // Process all sources in parallel
    await Promise.all(SOURCES.map(source => processSource(source).catch(err => {
      results.errors.push(`${source.label}: ${err.message}`);
    })));

    return Response.json({ success: true, ...results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});