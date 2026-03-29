import React, { useState } from "react";
import { LEARN_CARDS, GLOSSARY } from "@/lib/regData";
import OrgWeb from "@/components/learn/OrgWeb";
import LearningPaths from "@/components/learning/LearningPaths";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, BookOpen, Tag, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import GlossaryTooltip from "@/components/shared/GlossaryTooltip";

const TABS = [
  { id: "paths", label: "Learning Paths", icon: Map },
  { id: "fundamentals", label: "Fundamentals", icon: BookOpen },
];

export default function Learn({ userProfile, onXPChange }) {
  const [activeTab, setActiveTab] = useState("paths");
  const [expandedCard, setExpandedCard] = useState(null);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "regulators", label: "Regulators & Bodies" },
    { id: "key-regs", label: "Key Regulations" },
    { id: "fund-vehicles", label: "Fund Vehicles" },
    { id: "governance", label: "Governance & Substance" },
    { id: "risk-ops", label: "Risk & Operations" },
    { id: "aml-esg", label: "AML / ESG" },
    { id: "reporting", label: "Reporting" },
  ];

  const filteredGlossary = Object.entries(GLOSSARY).filter(([term, entry]) => {
    const matchesSearch = term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      entry.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = activeCategory === "all" || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-1 bg-secondary p-1 rounded-lg w-fit">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "paths" && <LearningPaths userProfile={userProfile} onXPChange={onXPChange} />}

      {activeTab === "fundamentals" && <div className="space-y-8">
      {/* Function Cards */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Learn the fundamentals</h2>
        <p className="text-xs text-muted-foreground mb-4">Understand each function's role in Luxembourg fund regulation</p>

        <div className="flex flex-col gap-2">
          {LEARN_CARDS.map((card) => {
            const isOpen = expandedCard === card.id;
            return (
              <Card
                key={card.id}
                className={cn(
                  "overflow-hidden transition-all cursor-pointer",
                  isOpen ? "shadow-md ring-1 ring-primary/20" : "hover:shadow-sm"
                )}
                onClick={() => setExpandedCard(isOpen ? null : card.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0">{card.icon}</span>
                      <div className="min-w-0">
                        <h3 className={cn("font-semibold text-sm transition-colors", isOpen && "text-primary")}>{card.title}</h3>
                        {!isOpen && <p className="text-xs text-muted-foreground mt-0.5 truncate">{card.summary}</p>}
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="shrink-0">
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-muted-foreground mt-1 mb-1">{card.summary}</p>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-foreground/80 leading-relaxed">{card.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Regulatory Chain Visual */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          How regulations reach your desk
        </h2>
        <p className="text-xs text-muted-foreground mb-4">The regulatory chain from EU to your internal policies</p>

        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { level: "EU Directive / Regulation", desc: "Sets the framework (e.g., UCITS Directive, AIFMD, DORA)", color: "from-lux-blue to-lux-blue" },
            { level: "ESMA Technical Standards", desc: "Develops detailed rules and guidelines", color: "from-lux-blue/70 to-lux-blue/70" },
            { level: "CSSF Circular / FAQ", desc: "Transposes into Luxembourg law", color: "from-lux-red/70 to-lux-red/70" },
            { level: "Your Internal Policy", desc: "Policies and procedures you implement", color: "from-lux-red to-lux-red" },
          ].map((step, i) => (
            <div key={i} className="flex-1 flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
              <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0", step.color)}>
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-xs">{step.level}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Org Web */}
      <OrgWeb />

      {/* Glossary */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Glossary</h2>
        <p className="text-xs text-muted-foreground mb-4">Key terms in Luxembourg fund regulation</p>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search terms or definitions..."
            value={glossarySearch}
            onChange={(e) => setGlossarySearch(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground mb-3">{filteredGlossary.length} term{filteredGlossary.length !== 1 ? "s" : ""}</p>

        <div className="grid gap-2 sm:grid-cols-2">
          {filteredGlossary.map(([term, entry]) => (
            <Card key={term} className="p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-xs text-primary">{term}</p>
                <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 shrink-0 capitalize">
                  {CATEGORIES.find(c => c.id === entry.category)?.label || entry.category}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{entry.definition}</p>
            </Card>
          ))}
        </div>

        {filteredGlossary.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No terms match your search.</p>
        )}
      </div>
    </div>}
    </div>
  );
}