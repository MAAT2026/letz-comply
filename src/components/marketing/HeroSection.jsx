import React from "react";
import { base44 } from "@/api/base44Client";
import { Calendar, BookOpen, Layers, CheckSquare } from "lucide-react";
import { SOURCE_COLORS } from "@/lib/sampleFeedData";

const MINI_ITEMS = [
  { source: "CSSF", title: "CSSF Circular 26/01 on ICT risk management", priority: "high", date: "18 Mar 2026" },
  { source: "ESMA", title: "Final guidelines on fund naming conventions", priority: "high", date: "15 Mar 2026" },
  { source: "ALFI", title: "Updated tax guide for Luxembourg funds", priority: "medium", date: "10 Mar 2026" },
];

const PRIORITY_DOT = { high: "bg-red-500", medium: "bg-amber-400", low: "bg-emerald-500" };

const PLATFORM_PILLS = [
  { icon: Calendar, label: "Deadline Calendar" },
  { icon: BookOpen, label: "Learning Paths" },
  { icon: Layers, label: "Fund Simulator" },
  { icon: CheckSquare, label: "Action Tracker" },
];

function MiniCard({ source, title, priority, date }) {
  const colors = SOURCE_COLORS[source] || { bg: "#64748b", text: "#fff" };
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-3.5 flex items-start gap-3">
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${PRIORITY_DOT[priority]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground leading-snug truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>{source}</span>
          <span className="text-[10px] text-muted-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const handleSignup = () => base44.auth.redirectToLogin("/app/feed");

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Free during beta
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-5">
            Stay ahead of Luxembourg fund regulation —
            <span className="text-primary"> without the noise</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            LetzComply is your all-in-one compliance platform. Get a personalised regulatory feed from CSSF, ESMA, ALFI, and LPEA — with AI summaries in plain language, plus tools to learn, plan, and act.
          </p>

          {/* Platform pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PLATFORM_PILLS.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium bg-secondary text-secondary-foreground border border-border px-3 py-1.5 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <button
              onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm shadow-sm"
            >
              Explore the Feed ↓
            </button>
            <button
              onClick={handleSignup}
              className="border border-border text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary transition-colors text-sm"
            >
              Sign Up Free
            </button>
          </div>
          <p className="text-xs text-muted-foreground">No credit card required · Free during beta · Built for Luxembourg fund professionals</p>
        </div>

        {/* Mini feed mockup */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl -z-10 transform rotate-1" />
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-5 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-lux-red" />
              <div className="w-2 h-2 rounded-full bg-secondary-foreground/20" />
              <div className="w-2 h-2 rounded-full bg-lux-blue" />
              <span className="text-xs text-muted-foreground ml-2 font-medium">LetzComply Feed</span>
            </div>
            {MINI_ITEMS.map((item, i) => <MiniCard key={i} {...item} />)}
            <div className="text-center pt-1">
              <span className="text-xs text-muted-foreground">↓ more updates today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}