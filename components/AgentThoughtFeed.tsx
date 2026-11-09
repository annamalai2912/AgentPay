"use client";

import React, { useState } from "react";
import { AgentThoughtStep, AgentDecision } from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="bg-charcoal border border-hairline rounded-sm p-6 text-center text-stone">
        <div className="w-2 h-2 bg-stone-dark mx-auto mb-2 rounded-xs" />
        <h3 className="text-xs font-mono font-medium text-stone-light uppercase tracking-wider">
          ORCHESTRATION_ENGINE_IDLE
        </h3>
        <p className="text-[11px] text-stone mt-1 max-w-sm mx-auto font-mono">
          Awaiting natural language procurement parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-charcoal border border-hairline rounded-sm p-4 space-y-3 font-mono">
      {/* Ledger Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-hairline text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-bronze rounded-xs" />
          <span className="font-semibold text-bone uppercase tracking-wider">
            AGENT DECISION LEDGER
          </span>
          <span className="text-[10px] text-stone">0x89F4...B912</span>
        </div>

        {decision && (
          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-1.5 py-0.5 rounded-xs bg-obsidian border border-hairline text-stone-light">
              CONFIDENCE: {decision.confidenceScore}%
            </span>
            <span className="px-1.5 py-0.5 rounded-xs bg-obsidian border border-hairline text-stone-light">
              {steps.length} STAGES_EXECUTED
            </span>
          </div>
        )}
      </div>

      {/* Audit Step List */}
      <div className="space-y-2">
        {steps.map((step, idx) => {
          const isExpanded = !!expandedSteps[step.id];
          const hasDetails = step.toolArgs || step.toolResult;

          return (
            <div
              key={step.id}
              className="p-3 bg-obsidian border border-hairline rounded-xs transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-stone">[{String(idx + 1).padStart(2, "0")}]</span>
                    <span className="text-bone font-semibold uppercase">{step.stepName}</span>
                    {step.toolName && (
                      <span className="px-1.5 py-0.2 rounded-xs bg-charcoal text-bronze border border-hairline">
                        {step.toolName}
                      </span>
                    )}
                    <span className="text-stone-dark">{step.timestamp}</span>
                  </div>
                  <p className="text-[12px] font-sans text-stone-light leading-relaxed">
                    {step.message}
                  </p>
                </div>

                {hasDetails && (
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="p-1 text-stone hover:text-bone transition-colors cursor-pointer"
                    title={isExpanded ? "Collapse arguments" : "Expand arguments"}
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Tool Parameters & Result */}
              {isExpanded && hasDetails && (
                <div className="mt-2.5 pt-2 border-t border-hairline text-[10px] space-y-2 text-stone-light">
                  {step.toolArgs && (
                    <div>
                      <span className="text-stone uppercase block mb-1">TOOL_PARAMETERS:</span>
                      <pre className="p-2 bg-charcoal border border-hairline text-stone-light overflow-x-auto rounded-xs">
                        {JSON.stringify(step.toolArgs, null, 2)}
                      </pre>
                    </div>
                  )}
                  {step.toolResult && (
                    <div>
                      <span className="text-stone uppercase block mb-1">EXECUTION_OUTPUT:</span>
                      <pre className="p-2 bg-charcoal border border-hairline text-stone-light overflow-x-auto rounded-xs">
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

      {/* Security & Policy Ledger */}
      {decision && (
        <div className="pt-2 border-t border-hairline grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
          <div className="p-2 bg-obsidian border border-hairline rounded-xs text-stone-light">
            <span className="text-stone block">SELLER_SCORE:</span>
            <span className="text-bone font-medium font-tabular">&ge; 90% PASS</span>
          </div>
          <div className="p-2 bg-obsidian border border-hairline rounded-xs text-stone-light">
            <span className="text-stone block">RETURN_WINDOW:</span>
            <span className="text-bone font-medium">30-DAY ASSURED</span>
          </div>
          <div className="p-2 bg-obsidian border border-hairline rounded-xs text-stone-light">
            <span className="text-stone block">BUYER_ESCROW:</span>
            <span className="text-bone font-medium">PAYPAL COVERED</span>
          </div>
          <div className="p-2 bg-obsidian border border-hairline rounded-xs text-stone-light">
            <span className="text-stone block">BUDGET_GUARD:</span>
            <span className={`font-medium ${decision.withinBudget ? "text-emerald-500" : "text-bronze"}`}>
              {decision.withinBudget ? "COMPLIANT" : "OVERRIDE_REQ"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
