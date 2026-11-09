"use client";

import React, { useEffect } from "react";
import { CapturedOrderReceipt } from "@/lib/types";
import {
  CheckCircle2,
  X,
  Printer,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Calendar,
  CreditCard,
  Tag,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

interface DigitalReceiptModalProps {
  receipt: CapturedOrderReceipt | null;
  onClose: () => void;
  onNewSearch: () => void;
}

export function DigitalReceiptModal({
  receipt,
  onClose,
  onNewSearch,
}: DigitalReceiptModalProps) {
  useEffect(() => {
    if (receipt) {
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0070BA", "#FFC439", "#38bdf8", "#10b981"],
      });
    }
  }, [receipt]);

  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-cyber-card border border-cyber-border rounded-2xl p-6 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Header */}
        <div className="text-center space-y-2 pb-4 border-b border-cyber-border">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Payment Captured Successfully!</h2>
          <p className="text-xs text-slate-400">
            PayPal Transaction Authenticated &bull; Autonomous Agent Procurement Complete
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-sans text-xs">
          <div className="grid grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">PayPal Order ID:</span>
              <span className="font-mono text-cyan-300 font-semibold break-all">{receipt.orderId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Capture ID:</span>
              <span className="font-mono text-emerald-400 font-semibold break-all">{receipt.captureId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Payer Account:</span>
              <span className="font-medium text-white">{receipt.payerName} ({receipt.payerEmail})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Settlement Method:</span>
              <span className="font-medium text-paypal-light">{receipt.paymentSource}</span>
            </div>
          </div>
        </div>

        {/* Itemized Order Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Procured Asset Breakdown
          </h4>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex gap-3 items-center">
            <img
              src={receipt.product.image}
              alt={receipt.product.title}
              className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono uppercase text-paypal-light font-bold">
                {receipt.product.brand}
              </span>
              <h5 className="text-xs font-bold text-white truncate">{receipt.product.title}</h5>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                <span>Qty: 1</span>
                <span>&bull;</span>
                <span className="text-emerald-400 font-medium">Free Express Shipping</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-base font-bold text-white">
                ${receipt.dealBreakdown.finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* AI Savings & Audit Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/30 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Autonomous Savings Report</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {receipt.savingsSummary}. The agent successfully verified the merchant’s 98% trust score, confirmed the 30-day return window, and secured a negotiated discount of <strong>${receipt.dealBreakdown.savingsTotal.toFixed(2)}</strong>.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-slate-400">
            <Tag className="w-3 h-3 text-paypal-gold" />
            <span>Applied Coupon: {receipt.dealBreakdown.couponCodeUsed || "PAYPAL_DIRECT"}</span>
          </div>
        </div>

        {/* Policy & Protection Guarantee */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-paypal-navy/50 border border-paypal-blue/30 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-paypal-gold shrink-0" />
          <span>
            Backed by <strong>PayPal Buyer Protection</strong>. If the item doesn&apos;t arrive or match the description, you&apos;re covered for the full purchase price.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Receipt</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNewSearch();
            }}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-paypal-blue via-paypal-light to-cyan-400 hover:from-paypal-light hover:to-cyan-300 flex items-center justify-center gap-2 shadow-lg shadow-paypal-blue/20 transition-all cursor-pointer"
          >
            <span>Start Another Autonomous Goal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
