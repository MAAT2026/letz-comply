import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, ChevronRight, Trophy, Zap } from "lucide-react";

export default function QuizModal({ module, onComplete, onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]); // store each answer result
  const [finished, setFinished] = useState(false);

  const questions = module.questions || [];
  const q = questions[current];
  const isCorrect = selected === q?.answer;

  // Compute score from stored answers so it's always accurate at results screen
  const score = answers.filter(Boolean).length;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  };

  const handleNext = () => {
    const correct = selected === q?.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const passed = score >= Math.ceil(questions.length * 0.6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-base">{module.title}</h3>
              {!finished && <p className="text-xs text-muted-foreground mt-0.5">Question {current + 1} of {questions.length}</p>}
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          {!finished && (
            <div className="h-1.5 bg-secondary rounded-full mb-6">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-sm font-semibold mb-4 leading-relaxed">{q.question || q.q}</p>

                <div className="space-y-2 mb-5">
                  {q.options.map((opt, idx) => {
                    let style = "border-border bg-background hover:bg-secondary hover:border-primary/30";
                    if (answered) {
                      if (idx === q.answer) style = "border-emerald-500 bg-emerald-50 text-emerald-800";
                      else if (idx === selected) style = "border-red-400 bg-red-50 text-red-700";
                      else style = "border-border bg-background opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center gap-3",
                          style,
                          !answered && "cursor-pointer"
                        )}
                      >
                        <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                        {answered && idx === q.answer && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />}
                        {answered && idx === selected && idx !== q.answer && <XCircle className="w-4 h-4 text-red-500 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                    <div className={cn(
                      "p-3 rounded-lg mb-4 text-xs font-medium",
                      isCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                    )}>
                      {isCorrect ? "✓ Correct!" : `✗ The correct answer is: ${q.options[q.answer]}`}
                    </div>
                    <Button onClick={handleNext} className="w-full gap-2">
                      {current + 1 >= questions.length ? "Finish Quiz" : "Next Question"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl",
                  passed ? "bg-emerald-100" : "bg-red-100"
                )}>
                  {passed ? "🏆" : "📚"}
                </div>
                <h4 className="font-bold text-lg mb-1">{passed ? "Quiz Passed!" : "Keep Learning"}</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  You got <strong>{score}/{questions.length}</strong> correct
                </p>
                {passed && (
                  <div className="flex items-center justify-center gap-1 text-primary font-bold text-base mb-5">
                    <Zap className="w-4 h-4" /> +{module.xp} XP earned
                  </div>
                )}
                {!passed && (
                  <p className="text-xs text-muted-foreground mb-5">You need 60% to pass. Review the material and try again.</p>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
                  {passed
                    ? <Button onClick={onComplete} className="flex-1 gap-1"><Trophy className="w-4 h-4" /> Claim XP</Button>
                    : <Button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setAnswers([]); setFinished(false); }} className="flex-1">Retry</Button>
                  }
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}