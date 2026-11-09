"use client";

import React from "react";
import { ShieldCheck, Cpu, Sparkles, ExternalLink, Activity } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyber-border/70 bg-cyber-dark/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-paypal-blue via-paypal-light to-cyan-400 p-[2px] shadow-lg shadow-paypal-blue/20">
            <div className="w-full h-full bg-cyber-dark rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-paypal-light animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Agent<span className="text-paypal-light">Pay</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-paypal-blue/20 text-paypal-light border border-paypal-blue/30 rounded-full">
                AI Commerce
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Autonomous Buyer & Price Negotiator powered by PayPal
            </p>
          </div>
        </div>

        {/* Status Pills */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-card border border-cyber-border text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agentic Loop: Online</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-paypal-darkblue/40 border border-paypal-blue/40 text-xs text-cyan-200">
            <ShieldCheck className="w-3.5 h-3.5 text-paypal-gold" />
            <span>PayPal Sandbox v2</span>
          </div>
        </div>

        {/* External links */}
        <div className="flex items-center gap-3">
          <a
            href="https://paypalaihackathon.devpost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all"
          >
            Devpost Hackathon
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-paypal-gold bg-paypal-gold/10 border border-paypal-gold/30 rounded-lg">
            <span>Render Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
