import React from "react";
import { Rss, Bot, Target, Mail } from "lucide-react";

const FEATURES = [
  {
    icon: <Rss className="w-5 h-5 text-primary" />,
    title: "All 4 Luxembourg Sources, One Feed",
    desc: "We monitor CSSF, ESMA, ALFI, and LPEA so you don't have to check four different websites every morning.",
  },
  {
    icon: <Bot className="w-5 h-5 text-primary" />,
    title: "AI Summaries in Plain Language",
    desc: "Every regulation gets an AI-written summary explaining what changed, what it means, and what you need to do.",
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    title: "Personalised to Your Role",
    desc: "Tell us your entity type, department, and fund focus. We filter and prioritise so you only see what's relevant.",
  },
  {
    icon: <Mail className="w-5 h-5 text-primary" />,
    title: "Daily Email Digest",
    desc: "Get a morning briefing with everything new — sorted by priority, summarised, and ready to scan in 2 minutes.",
  },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Core Features</span>
          <h2 className="text-3xl font-bold text-foreground mb-3">Built for Luxembourg fund professionals</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to stay on top of regulatory changes.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-6 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}