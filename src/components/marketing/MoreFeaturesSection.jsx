import React from "react";
import { base44 } from "@/api/base44Client";
import { GraduationCap, Calendar, Layers, UserCheck } from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    tag: "Learn",
    title: "Interactive Learning Paths",
    desc: "Master Luxembourg fund regulations through structured modules — UCITS, AIFMD, CSSF supervision, AML, and more. Earn XP as you progress.",
    highlights: ["Structured modules by regulation type", "Role-based learning tracks", "Quizzes & XP progression system"],
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    tagColor: "bg-primary/10 text-primary",
    dotColor: "bg-primary",
  },
  {
    icon: Calendar,
    tag: "Calendar",
    title: "Regulatory Deadline Tracker",
    desc: "Never miss a filing date or compliance deadline. A unified view of CSSF, ESMA, and ALFI deadlines merged with your own team reminders.",
    highlights: ["CSSF, ESMA & ALFI deadlines", "Industry events & conferences", "Personal team reminders"],
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    tagColor: "bg-accent/10 text-accent",
    dotColor: "bg-accent",
  },
  {
    icon: Layers,
    tag: "Fund Simulation",
    title: "Fund Structure Simulator",
    desc: "Design and validate a new Luxembourg fund before a single document is drafted. Choose regime, legal form, and investor profile — get a full regulatory checklist.",
    highlights: ["UCITS · SIF · RAIF · ELTIF 2.0", "Regulatory requirement checklist", "Estimated timelines & fees"],
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    tagColor: "bg-emerald-100 text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  {
    icon: UserCheck,
    tag: "Client Onboarding",
    title: "Onboarding Wizard",
    desc: "Generate a structured onboarding brief for new fund mandates in minutes. Walk through client overview, fund terms, investor profile, and services.",
    highlights: ["Multi-step mandate capture", "Investor profile & fund terms", "Exportable proposal brief"],
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    tagColor: "bg-purple-100 text-purple-700",
    dotColor: "bg-purple-500",
  },
];

export default function MoreFeaturesSection() {
  return (
    <section id="platform" className="py-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Full Platform</span>
          <h2 className="text-3xl font-bold text-foreground mb-3">Everything a Luxembourg fund professional needs</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Beyond the regulation feed — tools to learn, plan, and operate with confidence.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 ${f.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${f.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${f.tagColor}`}>{f.tag}</span>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{f.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {f.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${f.dotColor}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => base44.auth.redirectToLogin()}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-7 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get full access — it's free
          </button>
          <p className="text-xs text-muted-foreground mt-2">No credit card required. Beta access open now.</p>
        </div>
      </div>
    </section>
  );
}