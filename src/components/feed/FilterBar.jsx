import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const SOURCES = ["All Sources", "CSSF", "ESMA", "ALFI", "LPEA"];
const TOPICS = [
  "All Topics", "Valuation", "Compliance", "Fund Law", "IT / Technology",
  "Risk Management", "ESG / Sustainability", "Operations", "Reporting", "AML/CFT", "Other"
];
const RELEVANCES = ["All Relevance", "High", "Medium", "Low"];
const DATE_RANGES = ["All Dates", "Last 7 days", "Last 30 days", "Last 3 months", "Last year"];

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search regulations..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={filters.source} onValueChange={(v) => onFilterChange({ ...filters, source: v })}>
          <SelectTrigger className="w-36 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.topic} onValueChange={(v) => onFilterChange({ ...filters, topic: v })}>
          <SelectTrigger className="w-44 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TOPICS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.relevance} onValueChange={(v) => onFilterChange({ ...filters, relevance: v })}>
          <SelectTrigger className="w-36 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RELEVANCES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.dateRange} onValueChange={(v) => onFilterChange({ ...filters, dateRange: v })}>
          <SelectTrigger className="w-40 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}