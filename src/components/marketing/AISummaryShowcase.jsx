import React from "react";
import { base44 } from "@/api/base44Client";
import { SOURCE_COLORS } from "@/lib/sampleFeedData";

const SHOWCASE_CARDS = [
  {
    source: "CSSF",
    date: "18 March 2026",
    priority: "High",
    title: "CSSF Circular 26/01 — ICT Risk Management",
    summary: `The CSSF has issued Circular 26/01, establishing detailed ICT risk management requirements for Luxembourg fund managers in line with DORA. Key obligations include mandatory ICT risk assessments by Q3 2026, new incident reporting within 4 hours, and third-party ICT provider oversight. Fund managers must designate a senior ICT risk officer and submit their ICT risk framework by 30 September 2026.`,
    whyItMatters: "If you're a ManCo or AIFM in Luxembourg, this is your DORA roadmap. The September deadline is tight — start your gap analysis now.",
  },
  {
    source: "ESMA",
    date: "15 March 2026",
    priority: "High",
    title: "ESMA Fund Naming Guidelines — ESG Terms",
    summary: `ESMA's final guidelines on fund names using ESG or sustainability-related terms take effect 21 May 2026 for new funds (21 November 2026 for existing). Funds must meet quantitative thresholds: minimum 80% of investments aligned with ESG characteristics. Exclusion criteria also apply.`,
    whyItMatters: "Check your fund names now. If any of your UCITS or AIFs use ESG-related terms, you have until November to comply or rename.",
  },
];

export default function AISummaryShowcase() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">AI Analysis</span>
          <h2 className="text-3xl font-bold text-foreground mb-3">See what our AI summaries look like</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Plain-language summaries written for fund professionals — not lawyers.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {SHOWCASE_CARDS.map((card, i) => {
            const colors = SOURCE_COLORS[card.source];
            return (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                    {card.source}
                  </span>
                  <span className="text-xs text-muted-foreground">{card.date}</span>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {card.priority}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">AI Summary</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{card.summary}</p>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-auto">
                  <p className="text-xs font-bold text-primary mb-1">⚡ Why this matters for Luxembourg funds:</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{card.whyItMatters}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-card border border-border rounded-2xl py-8 px-6 shadow-sm">
          <p className="text-foreground text-base mb-4">Get analysis like this for every new regulation, every day.</p>
          <button
            onClick={() => base44.auth.redirectToLogin("/app/feed")}
            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
          >
            Sign up free →
          </button>
        </div>
      </div>
    </section>
  );
}