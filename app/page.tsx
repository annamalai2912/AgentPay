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
    <div className="bg-white min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Direct Command Bar */}
        <AgentCommandBar onRunAgent={handleRunAgent} isLoading={isLoading} />

        {/* Dual Column Agent Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Decision Ledger (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <AgentThoughtFeed steps={steps} decision={decision} isLoading={isLoading} />

            {/* Rationale Callout Card */}
            {decision && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
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
        onNewSearch={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
