import React from "react";
import { FUNCTIONS, SEGMENTS, SENIORITY_LEVELS, ENTITY_TYPES } from "@/lib/regData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 3;

export default function FunctionSelector({ onComplete, currentFunction, initialAnswers }) {
  // BUGFIX: Initialize states with pre-filled answers if available
  const [step, setStep] = React.useState(1);
  const [entityType, setEntityType] = React.useState(initialAnswers?.entityType || "");
  const [seniority, setSeniority] = React.useState(initialAnswers?.seniority || "");
  const [selectedFunction, setSelectedFunction] = React.useState(initialAnswers?.function || currentFunction || "");
  const [segment, setSegment] = React.useState(initialAnswers?.segment || "");

  const handleComplete = () => {
    onComplete({ entityType, seniority, function: selectedFunction, segment });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lux-blue to-lux-red flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to <span className="text-primary">Letz Comply</span></h1>
          <p className="text-muted-foreground mt-1 text-sm">Your personalised Luxembourg fund regulation guide</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i + 1 <= step ? "bg-primary" : "bg-border",
              i + 1 === step ? "w-8" : "w-4"
            )} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 - Entity type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <p className="text-sm font-medium text-center text-muted-foreground mb-4">
                What type of firm do you work for?
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {ENTITY_TYPES.map((et) => (
                  <button
                    key={et.id}
                    onClick={() => setEntityType(et.id)}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all hover:shadow-sm",
                      entityType === et.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <span className="text-xl">{et.icon}</span>
                    <p className="font-semibold text-sm mt-1.5 leading-tight">{et.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">{et.description}</p>
                  </button>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(2)} disabled={!entityType}>
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2 - Seniority & department */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <p className="text-sm font-medium text-center text-muted-foreground mb-4">
                Your seniority and department
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Seniority level</label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SENIORITY_LEVELS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department / function</label>
                <div className="grid grid-cols-2 gap-2">
                  {FUNCTIONS.map((func) => (
                    <button
                      key={func.id}
                      onClick={() => setSelectedFunction(func.id)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-left transition-all hover:shadow-sm flex items-center gap-2.5",
                        selectedFunction === func.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <span className="text-lg">{func.icon}</span>
                      <p className="font-medium text-sm">{func.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)} disabled={!seniority || !selectedFunction}>Continue</Button>
              </div>
            </motion.div>
          )}

          {/* Step 3 - Fund segment */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <p className="text-sm font-medium text-center text-muted-foreground mb-4">
                Your primary fund segment
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary fund segment <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Select value={segment} onValueChange={setSegment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={handleComplete}>
                  Get Started 🚀
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}