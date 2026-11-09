"use client";

import React, { useState } from "react";
import { Sparkle, CurrencyDollar, ArrowRight, CircleNotch } from "@phosphor-icons/react";

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
      label: "🖥️ 4K Portable Monitor ($150)",
      query: "Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate/find the best bundle deal, and checkout.",
      budget: 150,
    },
    {
      label: "⌨️ Keychron Mechanical Keyboard ($130)",
      query: "Find me an ergonomic custom mechanical keyboard with hot-swappable switches under $130, check seller rating, and secure best promo.",
      budget: 130,
    },
    {
      label: "🎧 Sony WH-1000XM5 Headphones ($300)",
      query: "Find Sony WH-1000XM5 wireless noise cancelling headphones under $300, verify warranty and return policy, and prepare PayPal checkout.",
      budget: 300,
    },
    {
      label: "🔌 13-in-1 USB-C Dock ($110)",
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
    <div id="command-center" className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          {/* Main Natural Language Input */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-paypal-blue">
              <Sparkle size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to procure? Enter specifications, constraints, and target price..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-paypal-blue focus:bg-white text-sm transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Spending Limit Budget Control */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-full px-4 py-2">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Budget Cap:
            </span>
            <div className="relative flex items-center">
              <CurrencyDollar size={20} className="text-emerald-600 absolute left-2 pointer-events-none" />
              <input
                type="number"
                min="10"
                max="2000"
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-20 pl-7 pr-1 py-1 bg-white border border-slate-300 rounded-full text-slate-900 font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-paypal-blue"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Launch Pill Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-black hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <CircleNotch size={20} className="animate-spin text-white" />
                <span>Negotiating Deals...</span>
              </>
            ) : (
              <>
                <span>Launch Autonomous Agent</span>
                <ArrowRight size={20} className="text-paypal-gold" />
              </>
            )}
          </button>
        </div>

        {/* Preset quick pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Suggested Goals:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
