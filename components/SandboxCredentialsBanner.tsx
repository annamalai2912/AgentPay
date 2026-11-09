"use client";

import React, { useState } from "react";
import { CaretDown, CaretUp, CheckCircle, Key, Lightning } from "@phosphor-icons/react";

export function SandboxCredentialsBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-slate-50 border-b border-paypal-border text-xs text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-paypal-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-paypal-blue"></span>
            </span>
            <span className="font-bold text-paypal-darkblue">PayPal Sandbox Environment:</span>
            <span className="hidden sm:inline text-slate-600">
              Evaluator zero-setup active &bull; Orders v2 REST API ready for instant testing.
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 font-semibold text-paypal-blue hover:text-paypal-darkblue transition-colors cursor-pointer text-xs"
          >
            <span>{isOpen ? "Hide Judge Credentials" : "View Judge Credentials & Sandbox Info"}</span>
            {isOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 animate-fadeIn">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Lightning size={20} className="text-paypal-blue" />
                <span>1. Instant 1-Click Evaluation</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                No credentials required to test! The built-in PayPal fast-pass simulator allows you to experience the complete autonomous loop, price negotiation, and capture.
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Key size={20} className="text-paypal-darkblue" />
                <span>2. Using Your PayPal Sandbox App</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Provide your sandbox credentials in <code className="text-paypal-darkblue bg-slate-100 px-1 py-0.5 rounded font-mono">.env.local</code>:
              </p>
              <pre className="p-1.5 bg-slate-50 text-[10px] text-slate-800 border border-slate-200 rounded font-mono overflow-x-auto">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_id{'\n'}
                PAYPAL_CLIENT_SECRET=your_secret{'\n'}
                GEMINI_API_KEY=optional_key
              </pre>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle size={20} className="text-emerald-600" />
                <span>3. PayPal Buyer Protection</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                AgentPay validates seller ratings (&ge;90%) and 30-day return windows before constructing the PayPal Orders payload, ensuring buyer safety.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

