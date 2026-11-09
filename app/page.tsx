"use client";

import React, { useState, useEffect } from "react";
import { AgentCommandBar } from "@/components/AgentCommandBar";
import { AgentThoughtFeed } from "@/components/AgentThoughtFeed";
import { ProductCard } from "@/components/ProductCard";
import { PayPalCheckoutModal } from "@/components/PayPalCheckoutModal";
import { DigitalReceiptModal } from "@/components/DigitalReceiptModal";
import {
  AgentThoughtStep,
  AgentDecision,
  Product,
  DealBreakdown,
  CapturedOrderReceipt,
} from "@/lib/types";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowUpRight,
  Bot,
} from "lucide-react";

export default function Home() {
  const [steps, setSteps] = useState<AgentThoughtStep[]>([]);
  const [decision, setDecision] = useState<AgentDecision | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userBudget, setUserBudget] = useState<number>(150);

  // Modals
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<DealBreakdown | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<CapturedOrderReceipt | null>(null);

  // Initial run on mount for instant demonstration
  useEffect(() => {
    handleRunAgent(
      "Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate/find the best bundle deal, and checkout.",
      150
    );
  }, []);

  const handleRunAgent = async (query: string, budget: number) => {
    setIsLoading(true);
    setUserBudget(budget);
    setSteps([]);
    setDecision(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, budget }),
      });

      if (!res.ok) {
        throw new Error("Failed to execute agent loop");
      }

      const data = await res.json();
      setSteps(data.steps || []);
      setDecision(data.decision || null);
    } catch (err) {
      console.error("Agent execution error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCheckout = (product: Product, deal: DealBreakdown) => {
    setSelectedProduct(product);
    setSelectedDeal(deal);
    setCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = (receipt: CapturedOrderReceipt) => {
    setCheckoutModalOpen(false);
    setActiveReceipt(receipt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paypal-blue/10 border border-paypal-blue/30 text-paypal-light text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PayPal AI Hackathon 2026</span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-paypal-gold">Target Track: Best Use of Agentic Commerce</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Autonomous Agentic Commerce <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-paypal-light via-cyan-400 to-paypal-gold">
            Powered by PayPal & AI
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Delegate your shopping, price negotiation, seller trust verification, and checkout to an autonomous AI agent with programmatic PayPal Sandbox settlement.
        </p>

        {/* Feature Highlights Ticker */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Autonomous Tool Calling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-paypal-light" />
            <span>Automated Coupon Negotiation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-paypal-gold" />
            <span>Spending Guardrails &amp; Buyer Protection</span>
          </div>
        </div>
      </div>

      {/* Main Command Input */}
      <AgentCommandBar onRunAgent={handleRunAgent} isLoading={isLoading} />

      {/* Dual Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Agent Reasoning & Decision Stream (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AgentThoughtFeed steps={steps} decision={decision} isLoading={isLoading} />

          {/* Rationale Executive Summary */}
          {decision && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-cyber-card to-slate-900 border border-cyber-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-paypal-light">
                <Bot className="w-4 h-4" />
                <span>Agent Procurement Summary</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {decision.rationale}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Negotiated Deals & Actionable Cart (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between pb-1 border-b border-cyber-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Recommended Procurement</span>
            </div>
            {decision && (
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Saved ${decision.dealBreakdown.savingsTotal.toFixed(2)}
              </span>
            )}
          </div>

          {decision && decision.targetProduct ? (
            <ProductCard
              product={decision.targetProduct}
              dealBreakdown={decision.dealBreakdown}
              onCheckout={handleOpenCheckout}
              isPrimary={true}
            />
          ) : (
            <div className="h-64 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500 text-xs">
              Waiting for agent decision...
            </div>
          )}

          {/* Alternatives Evaluated by the Agent */}
          {decision && decision.alternativeProducts.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Other Evaluated Options
                </span>
                <span className="text-[10px] text-slate-500">
                  {decision.alternativeProducts.length} alternatives compared
                </span>
              </div>

              <div className="space-y-3">
                {decision.alternativeProducts.slice(0, 2).map((alt) => (
                  <ProductCard
                    key={alt.id}
                    product={alt}
                    onCheckout={handleOpenCheckout}
                    isPrimary={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <PayPalCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        product={selectedProduct}
        dealBreakdown={selectedDeal}
        userBudget={userBudget}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DigitalReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        onNewSearch={() => {
          // Scroll to command bar
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
