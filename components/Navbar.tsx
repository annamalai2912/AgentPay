"use client";

import React, { useState } from "react";
import { ChevronDown, ExternalLink, X } from "lucide-react";

export function Navbar() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="w-full">
      {/* Top PayPal Navy Announcement Bar (exactly matching PayPal.com) */}
      {showBanner && (
        <div className="w-full bg-paypal-navy text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="text-white/80">Explore what PayPal AI Hackathon offers.</span>
              <a
                href="https://paypalaihackathon.devpost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline hover:text-paypal-gold flex items-center gap-1"
              >
                <span>View Hackathon Track Requirements &gt;</span>
              </a>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main PayPal Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-paypal-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Left: Official PayPal Monogram & Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              {/* Authentic PayPal Double-P SVG Monogram */}
              <svg className="w-7 h-9" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <span className="text-2xl font-bold tracking-tight text-paypal-darkblue italic font-sans">
                PayPal <span className="not-italic text-sm font-semibold text-slate-700 ml-1 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200">AgentPay</span>
              </span>
            </div>

            {/* Nav Links exactly like PayPal */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-paypal-text">
              <button className="flex items-center gap-1 hover:text-paypal-blue transition-colors cursor-pointer">
                <span>Personal</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button className="flex items-center gap-1 hover:text-paypal-blue transition-colors cursor-pointer">
                <span>Business</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button className="flex items-center gap-1 hover:text-paypal-blue transition-colors cursor-pointer">
                <span>Developer Sandbox</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button className="flex items-center gap-1 hover:text-paypal-blue transition-colors cursor-pointer">
                <span>Agentic AI</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </nav>
          </div>

          {/* Right: PayPal Signature Pill Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("command-center");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              Test Sandbox
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("command-center");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-2 text-sm font-semibold text-white bg-black hover:bg-neutral-800 rounded-full transition-colors shadow-sm cursor-pointer"
            >
              Launch Agent
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
