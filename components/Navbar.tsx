"use client";

import React from "react";
import { CheckCircle } from "@phosphor-icons/react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-paypal-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* Authentic PayPal Double-P SVG Monogram */}
          <svg className="w-6 h-8" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.345 8.35c-.44 2.825-2.483 4.887-5.32 4.887H9.288L7.84 22.42H3.7L6.685 3.32h7.67c3.21 0 5.43 1.862 4.99 5.03z"
              fill="#003087"
            />
            <path
              d="M21.94 11.23c-.44 2.825-2.484 4.887-5.32 4.887h-4.737L10.435 25.3h-3.69l2.25-14.39h5.127c3.21 0 5.43 1.862 4.99 5.03l-.002.001z"
              fill="#0079C1"
              opacity="0.85"
            />
          </svg>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight text-paypal-darkblue italic font-sans">
              PayPal
            </span>
            <span className="not-italic text-sm font-bold text-slate-800">
              AgentPay
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">
              | Autonomous Commerce Assistant
            </span>
          </div>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
            <CheckCircle size={16} className="text-emerald-600" />
            <span>Sandbox Orders v2 Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
