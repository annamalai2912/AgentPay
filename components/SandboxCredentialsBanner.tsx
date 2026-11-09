"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SandboxCredentialsBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-charcoal border-b border-hairline text-xs text-stone-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 bg-bronze rounded-xs" />
            <span className="text-bone font-medium">EVALUATION PROTOCOL:</span>
            <span className="hidden sm:inline text-stone">
              Zero-configuration sandbox mode active. Optional client ID &amp; secret override available.
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 font-mono text-[11px] text-stone hover:text-bone transition-colors cursor-pointer"
          >
            <span>{isOpen ? "[HIDE CREDENTIALS]" : "[INSPECT PARAMETERS]"}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-2.5 pt-2.5 border-t border-hairline grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] font-mono text-stone-light animate-fadeIn">
            <div className="p-3 bg-obsidian border border-hairline rounded-sm space-y-1">
              <span className="text-bone font-medium block">01 / FAST-PASS EVALUATION</span>
              <p className="text-stone leading-relaxed">
                Evaluators can test instantly. Click any preset, inspect the autonomous agent ledger, and authorize checkout via simulated or live sandbox capture.
              </p>
            </div>

            <div className="p-3 bg-obsidian border border-hairline rounded-sm space-y-1">
              <span className="text-bone font-medium block">02 / LIVE SANDBOX OVERRIDE</span>
              <p className="text-stone">
                Configure in <code className="text-bone bg-charcoal px-1 py-0.5 rounded-xs">.env.local</code>:
              </p>
              <pre className="p-1.5 bg-charcoal text-[10px] text-stone-light border border-hairline overflow-x-auto rounded-xs">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=sb{'\n'}
                PAYPAL_CLIENT_SECRET=sandbox_secret{'\n'}
                GEMINI_API_KEY=optional_key
              </pre>
            </div>

            <div className="p-3 bg-obsidian border border-hairline rounded-sm space-y-1">
              <span className="text-bone font-medium block">03 / SPENDING CIRCUIT-BREAKER</span>
              <p className="text-stone leading-relaxed">
                Deterministic budget cap. If final order exceeds the authorized ceiling, execution is halted until explicit operator override is granted.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
