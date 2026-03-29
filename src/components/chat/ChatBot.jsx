import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { CHAT_KB, CHAT_STARTERS } from "@/lib/regData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function findAnswer(question) {
  const q = question.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const [key, answer] of Object.entries(CHAT_KB)) {
    const words = key.split(" ");
    let score = 0;
    for (const word of words) {
      if (q.includes(word)) score++;
    }
    const normalized = score / words.length;
    if (normalized > bestScore && normalized > 0.3) {
      bestScore = normalized;
      bestMatch = answer;
    }
  }

  return bestMatch || "I don't have a specific answer for that. For authoritative guidance, check the CSSF website at cssf.lu or consult your compliance team.";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm your LetzComply assistant. Ask me anything about Luxembourg fund regulations, CSSF, UCITS, AIFMD, or any regulatory topic." }
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    setTimeout(() => {
      const answer = findAnswer(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: answer }]);
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-lux-blue to-lux-red text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-card rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
            style={{ maxHeight: "min(500px, calc(100vh - 10rem))" }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-lux-blue to-lux-red text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <p className="font-semibold text-sm">LetzComply assistant</p>
                  <p className="text-[10px] opacity-80">Luxembourg fund regulation Q&A</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-lg p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary rounded-bl-md"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEnd} />
            </div>

            {/* Starters */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {CHAT_STARTERS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t flex gap-2 shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about Luxembourg regulations..."
                className="text-xs h-9"
              />
              <Button size="sm" onClick={() => sendMessage()} className="h-9 px-3 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}