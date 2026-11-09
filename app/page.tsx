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
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

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

  // Floating helper widget state
  const [showHelper, setShowHelper] = useState<boolean>(true);

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

      if (!res.ok) throw new Error("Failed to execute agent loop");

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
    <div className="bg-white min-h-screen">
      {/* PayPal Official Hero Section (Matching paypal.com screenshot) */}
      <section className="pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-5">
        <span className="text-xs font-bold uppercase tracking-wider text-paypal-text block">
          Online autonomous checkout
        </span>

        <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight max-w-4xl mx-auto">
          Buy smarter with every prompt
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Offer autonomous AI agents the checkout experience that features preferred ways to pay with the PayPal Developer Platform.
        </p>

        {/* Action Buttons exactly matching PayPal screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById("command-center");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-black hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
          >
            Launch Agent
          </button>
          <a
            href="https://paypalaihackathon.devpost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          >
            Hackathon Docs
          </a>
        </div>
      </section>

      {/* Main Workspace Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        {/* Command Bar */}
        <AgentCommandBar onRunAgent={handleRunAgent} isLoading={isLoading} />

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Decision Ledger (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <AgentThoughtFeed steps={steps} decision={decision} isLoading={isLoading} />

            {/* Rationale Callout Card */}
            {decision && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-paypal-darkblue uppercase tracking-wider block">
                  Agent Procurement Summary:
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {decision.rationale}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Product Card & Alternatives (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-900">Recommended Procurement</span>
              {decision && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Save ${decision.dealBreakdown.savingsTotal.toFixed(2)}
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
              <div className="h-64 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                Awaiting agent decision...
              </div>
            )}

            {/* Alternatives */}
            {decision && decision.alternativeProducts.length > 0 && (
              <div className="space-y-3 pt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Other Evaluated Options ({decision.alternativeProducts.length})
                </span>
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
      </div>

      {/* Floating PayPal Help Widget on Bottom Right (exactly like PayPal.com screenshot) */}
      {showHelper && (
        <div className="fixed bottom-6 right-6 z-30 animate-fadeIn hidden sm:block">
          <div className="relative bg-paypal-navy text-white rounded-2xl p-5 shadow-2xl max-w-xs space-y-3">
            <button
              onClick={() => setShowHelper(false)}
              className="absolute top-2.5 right-2.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              &times;
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-paypal-gold" />
              <span className="font-bold text-sm">Questions about AgentPay?</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Explore how autonomous AI agents integrate with the PayPal Orders v2 Sandbox.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("command-center");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-2.5 px-4 rounded-full font-bold text-xs text-paypal-darkblue bg-white hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
            >
              Test with 4K Monitor Scenario
            </button>
          </div>
        </div>
      )}

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
          const el = document.getElementById("command-center");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
