"use client";

import React, { useState } from "react";
import {
  AgentThoughtStep,
  AgentDecision,
} from "@/lib/types";
import {
  Brain,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

interface AgentThoughtFeedProps {
  steps: AgentThoughtStep[];
  decision: AgentDecision | null;
  isLoading: boolean;
}

export function AgentThoughtFeed({ steps, decision, isLoading }: AgentThoughtFeedProps) {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setExpandedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (steps.length === 0 && !isLoading) {
    return (
      <div className="bg-cyber-card/60 border border-cyber-border rounded-2xl p-8 text-center text-slate-400">
        <Brain className="w-12 h-12 mx-auto mb-3 text-slate-600 animate-pulse" />
        <h3 className="text-base font-medium text-slate-200">Autonomous Reasoning Engine Idle</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Submit a purchase goal above. The agent will autonomously decompose your request, scan marketplace nodes, negotiate discount codes, run trust audits, and build a PayPal sandbox order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header with status and confidence */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-paypal-blue/20 text-paypal-light">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              Autonomous Agent Decision Stream
              {isLoading && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400">
              Live multi-step tool execution, discount negotiation & verification
            </p>
          </div>
        </div>

        {decision && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Confidence: {decision.confidenceScore}%</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>{steps.length} Steps Executed</span>
            </div>
          </div>
        )}
      </div>

      {/* Step by step timeline */}
      <div className="space-y-3 font-sans">
        {steps.map((step, idx) => {
          const isExpanded = !!expandedSteps[step.id];
          const hasDetails = step.toolArgs || step.toolResult;

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all ${
                step.status === "tool_call"
                  ? "bg-slate-900/90 border-slate-700/80 hover:border-slate-600"
                  : step.status === "complete"
                  ? "bg-emerald-950/30 border-emerald-800/50"
                  : step.status === "warning"
                  ? "bg-amber-950/30 border-amber-800/50"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {step.status === "tool_call" ? (
                      <div className="p-1.5 rounded-md bg-blue-500/20 text-cyan-400">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                    ) : step.status === "complete" ? (
                      <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : step.status === "warning" ? (
                      <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                        <Brain className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-300">
                        Step {idx + 1}: {step.stepName}
                      </span>
                      {step.toolName && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                          {step.toolName}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{step.message}</p>
                  </div>
                </div>

                {hasDetails && (
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={isExpanded ? "Collapse arguments" : "Expand arguments"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Tool args and results dropdown */}
              {isExpanded && hasDetails && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] font-mono space-y-2">
                  {step.toolArgs && (
                    <div>
                      <span className="text-slate-400 font-medium">Tool Parameters:</span>
                      <pre className="p-2 rounded bg-black/60 text-cyan-300 mt-1 overflow-x-auto">
                        {JSON.stringify(step.toolArgs, null, 2)}
                      </pre>
                    </div>
                  )}
                  {step.toolResult && (
                    <div>
                      <span className="text-slate-400 font-medium">Tool Execution Output:</span>
                      <pre className="p-2 rounded bg-black/60 text-emerald-300 mt-1 overflow-x-auto">
                        {JSON.stringify(step.toolResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety & Audit Badges */}
      {decision && (
        <div className="pt-3 border-t border-cyber-border grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center gap-2 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Seller Trust &gt; 95%</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center gap-2 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center gap-2 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-paypal-gold" />
            <span>PayPal Protection</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center gap-2 text-slate-300">
            <Shield className={`w-3.5 h-3.5 ${decision.withinBudget ? "text-emerald-400" : "text-amber-400"}`} />
            <span>{decision.withinBudget ? "Budget Compliant" : "Budget Override Req"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
