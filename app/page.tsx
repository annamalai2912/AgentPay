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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-hairline pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-bronze rounded-xs" />
            <span className="text-bone font-medium">PAYPAL AI HACKATHON 2026</span>
            <span>&bull;</span>
            <span>TRACK: AGENTIC COMMERCE</span>
          </div>
          <div className="text-stone-dark font-mono">
            SYS_REF: AGENTPAY-V1-RELEASE
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold text-bone tracking-tight font-sans">
          Autonomous Agentic Commerce Console
        </h1>

        <p className="text-xs sm:text-sm text-stone max-w-2xl font-sans leading-relaxed">
          Autonomous goal procurement, deal arbitrage, merchant trust auditing, and programmatic checkout orchestration via the PayPal Developer Platform.
        </p>
      </div>

      {/* Main Command Input */}
      <AgentCommandBar onRunAgent={handleRunAgent} isLoading={isLoading} />

      {/* Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Decision Ledger (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <AgentThoughtFeed steps={steps} decision={decision} isLoading={isLoading} />

          {decision && (
            <div className="p-3.5 bg-charcoal border border-hairline rounded-sm space-y-1 font-mono text-xs">
              <span className="text-[10px] text-bronze uppercase tracking-wider block font-semibold">
                EXECUTION_SUMMARY:
              </span>
              <p className="text-stone-light text-[11px] leading-relaxed font-sans">
                {decision.rationale}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Product Card & Alternatives (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1 text-xs font-mono">
            <span className="text-bone font-medium uppercase tracking-wider">
              TARGET_PROCUREMENT
            </span>
            {decision && (
              <span className="text-bronze font-semibold">
                REBATE: -${decision.dealBreakdown.savingsTotal.toFixed(2)}
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
            <div className="h-64 rounded-sm border border-hairline bg-charcoal flex items-center justify-center text-stone text-xs font-mono">
              AWAITING_AGENT_DECISION...
            </div>
          )}

          {decision && decision.alternativeProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone block">
                EVALUATED_ALTERNATIVES ({decision.alternativeProducts.length}):
              </span>
              <div className="space-y-2.5">
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
        onNewSearch={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
