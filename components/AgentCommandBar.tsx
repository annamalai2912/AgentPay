"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";

interface AgentCommandBarProps {
  onRunAgent: (query: string, budget: number) => void;
  isLoading: boolean;
}

export function AgentCommandBar({ onRunAgent, isLoading }: AgentCommandBarProps) {
  const [query, setQuery] = useState(
    "Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate/find the best bundle deal, and checkout."
  );
  const [budget, setBudget] = useState(150);

  const presets = [
    {
      label: "4K Portable Monitor ($150)",
      query: "Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate/find the best bundle deal, and checkout.",
      budget: 150,
    },
    {
      label: "Keychron Mechanical Keyboard ($130)",
      query: "Find me an ergonomic custom mechanical keyboard with hot-swappable switches under $130, check seller rating, and secure best promo.",
      budget: 130,
    },
    {
      label: "Sony WH-1000XM5 Headphones ($300)",
      query: "Find Sony WH-1000XM5 wireless noise cancelling headphones under $300, verify warranty and return policy, and prepare PayPal checkout.",
      budget: 300,
    },
    {
      label: "13-in-1 USB-C Dock ($110)",
      query: "Find a 13-in-1 USB-C triple display docking station under $110 with 85W power delivery and PayPal buyer protection.",
      budget: 110,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onRunAgent(query, budget);
  };

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setQuery(preset.query);
    setBudget(preset.budget);
    onRunAgent(preset.query, preset.budget);
  };

  return (
    <div className="w-full bg-charcoal border border-hairline rounded-sm p-4 text-bone">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center">
          {/* Main Natural Language Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="State procurement intent, hardware specifications, and budget ceiling..."
              className="w-full px-3.5 py-2.5 bg-obsidian border border-hairline focus:border-brass rounded-sm text-bone placeholder-stone text-xs font-sans focus:outline-none transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Spending Limit Budget Control */}
          <div className="flex items-center gap-2 bg-obsidian border border-hairline rounded-sm px-3 py-1.5">
            <span className="text-[11px] font-mono text-stone uppercase tracking-wider">
              CAP_USD:
            </span>
            <div className="flex items-center">
              <span className="text-stone font-mono text-xs">$</span>
              <input
                type="number"
                min="10"
                max="2000"
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-20 pl-1 pr-1 py-0.5 bg-transparent text-bone font-mono text-xs focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Execute Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-5 py-2.5 rounded-sm font-medium text-xs bg-bone hover:bg-stone-light text-obsidian disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>RESOLVING_DEAL...</span>
              </>
            ) : (
              <>
                <span>EXECUTE_AGENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="text-stone mr-1">SCENARIOS:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-xs bg-obsidian hover:bg-raised border border-hairline hover:border-hairline-strong text-stone-light hover:text-bone transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
