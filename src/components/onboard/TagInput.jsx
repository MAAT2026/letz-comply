import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function TagInput({ value = [], onChange, placeholder }) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-1.5 min-h-[40px] focus-within:ring-1 focus-within:ring-ring bg-background">
      {value.map(tag => (
        <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-md font-medium">
          {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        className="flex-1 outline-none bg-transparent text-sm min-w-[120px]"
        placeholder={placeholder || "Type and press Enter"}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={add}
      />
    </div>
  );
}