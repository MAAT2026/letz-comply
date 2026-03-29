import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Link2, CheckCircle2, AlertTriangle } from "lucide-react";
import { GLOSSARY } from "@/lib/regData";
import GlossaryTooltip from "../shared/GlossaryTooltip";

export default function RegDetail({ regulation, userFunction, onBack }) {
  const forYou = regulation.forYou?.[userFunction];

  const renderTextWithGlossary = (text) => {
    if (!text) return null;
    const terms = Object.keys(GLOSSARY);
    const regex = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const matchedTerm = terms.find(t => t.toLowerCase() === part.toLowerCase());
      if (matchedTerm) {
        return <GlossaryTooltip key={i} term={matchedTerm} definition={GLOSSARY[matchedTerm].definition} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderPlainText = (text) => {
    if (!text) return null;
    return <span>{text}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Disclaimer Banner */}
      <div className="border-l-4 border-amber-400 bg-yellow-50 rounded px-4 py-3 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          AI-generated content for informational purposes only. This is not legal or regulatory advice. Always consult the original source and a qualified professional before taking action.
        </p>
      </div>

      <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground -ml-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Feed
      </Button>

      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">{regulation.source}</Badge>
          <Badge variant="outline">{regulation.topic}</Badge>
          <Badge variant="outline">{regulation.date}</Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
          {regulation.title}
        </h1>
      </div>

      {/* For You Card */}
      {forYou && (
        <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-primary text-sm">What this means for you</h2>
              <p className="text-xs text-gray-400 mt-0.5">AI-generated · Not legal advice</p>
            </div>
          </div>
          <h3 className="font-bold text-lg text-foreground mb-2">{forYou.headline}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {renderTextWithGlossary(forYou.explanation)}
          </p>
          {forYou.actions?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested actions (AI-generated)</p>
              {forYou.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* AI Summary */}
      <Card className="p-5">
        <h2 className="font-semibold text-sm mb-2 flex items-center gap-2">
         <Sparkles className="w-4 h-4 text-lux-blue" /> AI summary
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {renderPlainText(regulation.aiSummary)}
        </p>
      </Card>

      {/* Regulatory Chain / Source */}
      <Card className="p-5">
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
         <Link2 className="w-4 h-4 text-lux-red" /> Regulatory chain
        </h2>
        {regulation.chain && regulation.chain.length > 0 ? (
          <div className="space-y-0">
            {regulation.chain.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-lux-blue to-lux-red shrink-0 mt-1" />
                  {i < regulation.chain.length - 1 && (
                    <div className="w-0.5 h-8 bg-border" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {step.level}
                  </p>
                  <p className="text-sm font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : regulation.url ? (
          <a href={regulation.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline flex items-center gap-1">
            View original source →
          </a>
        ) : (
          <p className="text-sm text-gray-400">Source URL not available</p>
        )}
      </Card>

      {/* Full detail */}
      <Card className="p-5">
        <h2 className="font-semibold text-sm mb-2">Full detail</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {renderPlainText(regulation.fullDetail)}
        </p>
      </Card>

      {/* Key concepts */}
      {regulation.concepts && (
        <Card className="p-5">
          <h2 className="font-semibold text-sm mb-3">Key concepts</h2>
          <div className="flex flex-wrap gap-2">
            {regulation.concepts.map((concept) => {
              const def = GLOSSARY[concept];
              if (def) {
                return <GlossaryTooltip key={concept} term={concept} definition={def.definition} asBadge />;
              }
              return <Badge key={concept} variant="secondary" className="text-xs">{concept}</Badge>;
            })}
          </div>
        </Card>
      )}
    </div>
  );
}