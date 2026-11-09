"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-obsidian/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-bronze rounded-xs" />
            <span className="text-sm font-semibold tracking-tight text-bone uppercase">
              AGENT<span className="text-stone">PAY</span>
            </span>
          </div>
          <span className="h-3 w-[1px] bg-hairline" />
          <span className="text-[11px] font-mono text-stone tracking-wide hidden sm:inline">
            ARCHITECTURAL COMMERCE &bull; PAYPAL V2 REST
          </span>
        </div>

        {/* Telemetry Chips */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-charcoal border border-hairline text-stone-light">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-xs" />
            <span>NODE-0814</span>
            <span className="text-stone">11.4ms</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-charcoal border border-hairline text-stone-light">
            <span className="text-stone">POOL:</span>
            <span className="text-bone font-medium font-tabular">$50,000.00 USD</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://paypalaihackathon.devpost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-stone-light hover:text-bone bg-charcoal hover:bg-raised border border-hairline hover:border-hairline-strong rounded-sm transition-colors cursor-pointer"
          >
            <span>DEVPOST_SPEC</span>
            <ExternalLink className="w-3 h-3 text-stone" />
          </a>
        </div>
      </div>
    </header>
  );
}
