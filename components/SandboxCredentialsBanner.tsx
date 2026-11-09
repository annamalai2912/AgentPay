"use client";

import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp, Key, CheckCircle, ShieldAlert } from "lucide-react";

export function SandboxCredentialsBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-paypal-navy/80 via-cyber-card to-cyber-dark border-b border-paypal-blue/30 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-white">Judge & Evaluator Guide:</span>
            <span className="hidden sm:inline text-slate-300">
              AgentPay runs with <strong>Zero-Setup Mode</strong> (instant 1-click test) and supports live <strong>PayPal Sandbox Credentials</strong>.
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-paypal-light hover:text-cyan-300 font-medium transition-colors cursor-pointer"
          >
            <span>{isOpen ? "Hide Credentials & Testing Instructions" : "View Judge Instructions"}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-slate-300 animate-fadeIn">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Instant 1-Click Evaluation</span>
              </div>
              <p className="text-slate-400">
                You can test every feature immediately! Click any quick preset below, watch the autonomous agent reason, and click <strong>Approve & Checkout</strong> to simulate the complete PayPal Sandbox capture and digital receipt generation.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Key className="w-3.5 h-3.5 text-paypal-gold" />
                <span>2. Using Your Own PayPal Sandbox</span>
              </div>
              <p className="text-slate-400">
                To connect your real sandbox app, add to your <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">.env.local</code>:
              </p>
              <pre className="p-1.5 rounded bg-black/60 font-mono text-[10px] text-slate-300 overflow-x-auto">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id{'\n'}
                PAYPAL_CLIENT_SECRET=your_sandbox_secret{'\n'}
                GEMINI_API_KEY=your_gemini_api_key
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Autonomous Guardrail</span>
              </div>
              <p className="text-slate-400">
                AgentPay enforces strict spending limits. If you set a budget lower than the negotiated price, the agent flags an authorization alert before allowing checkout, demonstrating safety in Agentic Commerce.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
