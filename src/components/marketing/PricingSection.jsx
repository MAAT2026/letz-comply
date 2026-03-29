import React from "react";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const FEATURES = [
  "All 4 Luxembourg regulatory sources",
  "AI-written summaries for every update",
  "Priority scoring (High / Medium / Low)",
  "Personalised feed based on your role",
  "Daily email digest",
  "Regulatory calendar with deadlines",
  "Interactive learning paths",
  "Fund simulation & onboarding tools",
  "Personal action tracker",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Pricing</span>
          <h2 className="text-3xl font-bold text-foreground mb-3">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">Free during beta. No credit card required.</p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="bg-card rounded-2xl border-2 border-primary shadow-lg p-8 text-center">
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
              Beta — Free Access
            </div>
            <p className="text-5xl font-extrabold text-foreground mb-1">€0</p>
            <p className="text-sm text-muted-foreground mb-8">per month, forever during beta</p>
            <ul className="space-y-3 text-left mb-8">
              {FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => base44.auth.redirectToLogin("/app/feed")}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
            >
              Sign Up Free
            </button>
            <p className="text-xs text-muted-foreground mt-3">No credit card · No commitment · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}