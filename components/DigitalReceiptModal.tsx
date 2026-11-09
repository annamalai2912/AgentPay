"use client";

import React, { useEffect } from "react";
import { CapturedOrderReceipt } from "@/lib/types";
import { CheckCircle2, X, Printer, ArrowRight, ShieldCheck } from "lucide-react";
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
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#003087", "#0079C1", "#FFC439", "#10B981"],
      });
    }
  }, [receipt]);

  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
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
            <span className="text-xl font-bold italic text-paypal-darkblue">PayPal</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        <div className="text-center space-y-1.5 py-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Payment Completed!</h2>
          <p className="text-xs text-slate-500">
            Your autonomous agent procurement was successfully captured via PayPal Sandbox.
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
          <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
            <span className="text-slate-500">PayPal Order ID:</span>
            <span className="font-mono font-semibold text-slate-900 break-all">{receipt.orderId}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
            <span className="text-slate-500">Capture ID:</span>
            <span className="font-mono font-semibold text-emerald-700 break-all">{receipt.captureId}</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
            <span className="text-slate-500">Payer Account:</span>
            <span className="font-medium text-slate-800">{receipt.payerEmail}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Payment Method:</span>
            <span className="font-medium text-paypal-blue">{receipt.paymentSource}</span>
          </div>
        </div>

        {/* Item Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center">
          <img
            src={receipt.product.image}
            alt={receipt.product.title}
            className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-paypal-blue">
              {receipt.product.brand}
            </span>
            <h5 className="text-xs font-bold text-slate-900 truncate">{receipt.product.title}</h5>
            <div className="text-xs text-slate-500 mt-0.5">Qty: 1 &bull; Free Express Shipping</div>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-slate-900 font-mono font-tabular">
              ${receipt.dealBreakdown.finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Savings Report */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-emerald-800">
            <span>🎉 Autonomous Savings Summary:</span>
          </span>
          <p className="text-[11px] leading-relaxed text-emerald-800">
            {receipt.savingsSummary}. The agent validated the seller&apos;s 98% trust score and confirmed 30-day return eligibility.
          </p>
        </div>

        {/* Protection Note */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Backed by <strong>PayPal Buyer Protection</strong>. Your transaction is covered.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-1">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 px-4 rounded-full font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNewSearch();
            }}
            className="flex-1 py-3 px-4 rounded-full font-bold text-xs text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Start Next Goal</span>
            <ArrowRight className="w-4 h-4 text-paypal-gold" />
          </button>
        </div>
      </div>
    </div>
  );
}
