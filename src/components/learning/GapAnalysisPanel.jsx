import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Loader2, BookOpen, ExternalLink, Lightbulb } from "lucide-react";

export default function GapAnalysisPanel({ userProfile, onSelectPath }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setPlan(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a Luxembourg fund regulation expert and learning coach. A ${userProfile?.seniority || "professional"} working in ${userProfile?.function || "fund management"} has described their knowledge weak spots below.

Your task: produce a concise, actionable learning plan with 3–5 specific focus areas. For each area:
- Give a clear title
- Explain why it matters for their role in 1–2 sentences
- List 2–3 precise regulatory references they should study (e.g. specific CSSF Circular 18/698 paragraph numbers, specific EU directive articles, ESMA guidelines)
- Give 1 concrete action they can take this week

Keep each focus area short and practical. Use real Luxembourg regulatory references (CSSF Circular 18/698 paragraph numbers, 2010 Law articles, AIFMD articles, etc.).

User's weak spots: "${input}"`,
      response_json_schema: {
        type: "object",
        properties: {
          summary: { type: "string", description: "1-sentence overall assessment" },
          focus_areas: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                why_it_matters: { type: "string" },
                references: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      detail: { type: "string" }
                    }
                  }
                },
                action: { type: "string" }
              }
            }
          }
        }
      }
    });

    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Input card */}
      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">AI Gap Analysis</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Describe what you find confusing or where you feel uncertain — get a personalised study plan with precise regulatory references.</p>
          </div>
        </div>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`e.g. "I'm not sure about the delegation rules under CSSF 18/698, especially what the letter-box entity test means in practice. Also unclear on AIFMD II LMT requirements and how they differ from existing tools."`}
          className="text-sm min-h-[90px] resize-none mb-3"
        />
        <Button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          size="sm"
          className="w-full gap-2"
        >
          {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating plan...</> : <><Lightbulb className="w-3.5 h-3.5" /> Generate learning plan</>}
        </Button>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {plan.summary && (
              <p className="text-xs text-muted-foreground italic px-1">{plan.summary}</p>
            )}
            {(plan.focus_areas || []).map((area, i) => (
              <Card key={i} className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-foreground leading-snug">{area.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{area.why_it_matters}</p>
                  </div>
                </div>

                {area.references?.length > 0 && (
                  <div className="space-y-1.5 pl-7">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Study these sources</p>
                    {area.references.map((ref, j) => (
                      <div key={j} className="flex items-start gap-2 p-2 bg-secondary/60 rounded-lg">
                        <BookOpen className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[11px] font-semibold text-foreground">{ref.label}</span>
                          {ref.detail && <span className="text-[11px] text-muted-foreground"> — {ref.detail}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {area.action && (
                  <div className="pl-7 flex items-start gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <ChevronRight className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-emerald-800"><span className="font-semibold">This week:</span> {area.action}</p>
                  </div>
                )}
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}