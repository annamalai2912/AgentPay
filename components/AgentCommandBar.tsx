"use client";

import React, { useState } from "react";
import { Sparkles, DollarSign, ArrowRight, Loader2, Zap, SlidersHorizontal } from "lucide-react";

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
      label: "🎧 Sony ANC Headphones ($300)",
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
    <div className="w-full bg-cyber-card/90 border border-cyber-border rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-paypal-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Main Natural Language Input */}
          <div className="flex-1 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-paypal-light">
              <Sparkles className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tell your agent what you want to buy, your constraints, and target price..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-paypal-light focus:border-transparent text-sm transition-all shadow-inner"
              disabled={isLoading}
            />
          </div>

          {/* Spending Limit Budget Control */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5">
            <div className="flex items-center gap-1 text-slate-400 text-xs whitespace-nowrap">
              <SlidersHorizontal className="w-3.5 h-3.5 text-paypal-gold" />
              <span>Budget Cap:</span>
            </div>
            <div className="relative flex items-center">
              <DollarSign className="w-4 h-4 text-emerald-400 absolute left-2 pointer-events-none" />
              <input
                type="number"
                min="10"
                max="2000"
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-24 pl-6 pr-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Run Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-paypal-blue via-paypal-light to-cyan-500 hover:from-paypal-darkblue hover:to-paypal-blue disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-paypal-blue/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Agent Negotiating...</span>
              </>
            ) : (
              <>
                <span>Launch Autonomous Agent</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Preset quick pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-400 mr-1">
            <Zap className="w-3.5 h-3.5 text-paypal-gold" />
            <span>Quick Scenarios:</span>
          </div>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all hover:border-paypal-light/50 cursor-pointer disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
