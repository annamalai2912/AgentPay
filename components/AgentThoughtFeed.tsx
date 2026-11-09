"use client";

import React, { useState } from "react";
import { AgentThoughtStep, AgentDecision } from "@/lib/types";
import { CheckCircle2, ChevronDown, ChevronUp, Wrench, ShieldCheck, Activity } from "lucide-react";

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
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 shadow-xs">
        <Activity className="w-8 h-8 mx-auto mb-2 text-paypal-blue animate-pulse" />
        <h3 className="text-sm font-semibold text-slate-800">Agent Reasoning Engine Ready</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Submit your shopping query above to watch the agent search verified merchants, negotiate coupon codes, and build a PayPal sandbox order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Header with status and confidence */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            Autonomous Procurement Ledger
            {isLoading && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-paypal-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-paypal-blue"></span>
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500">
            Real-time tool invocations, discount negotiation, and PayPal validation
          </p>
        </div>

        {decision && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              Match Confidence: {decision.confidenceScore}%
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              {steps.length} Steps
            </span>
          </div>
        )}
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isExpanded = !!expandedSteps[step.id];
          const hasDetails = step.toolArgs || step.toolResult;

          return (
            <div
              key={step.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {step.status === "complete" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : step.status === "tool_call" ? (
                      <Wrench className="w-4 h-4 text-paypal-blue" />
                    ) : (
                      <Activity className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        Step {idx + 1}: {step.stepName}
                      </span>
                      {step.toolName && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white text-paypal-darkblue border border-slate-200 font-medium">
                          {step.toolName}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.message}</p>
                  </div>
                </div>

                {hasDetails && (
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title={isExpanded ? "Collapse arguments" : "Expand arguments"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Tool Parameters & Results */}
              {isExpanded && hasDetails && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-mono space-y-2">
                  {step.toolArgs && (
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                        Tool Inputs:
                      </span>
                      <pre className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] overflow-x-auto">
                        {JSON.stringify(step.toolArgs, null, 2)}
                      </pre>
                    </div>
                  )}
                  {step.toolResult && (
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                        Execution Output:
                      </span>
                      <pre className="p-2.5 rounded-lg bg-white border border-slate-200 text-emerald-800 text-[11px] overflow-x-auto">
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

      {/* Safety & Trust Badges */}
      {decision && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Seller Trust &ge; 90%</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">30-Day Guarantee</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-paypal-blue" />
            <span className="font-medium">PayPal Protection</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-700">
            <span className={`w-2 h-2 rounded-full ${decision.withinBudget ? "bg-emerald-500" : "bg-amber-500"}`} />
            <span className="font-medium">{decision.withinBudget ? "Budget Compliant" : "Override Required"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
