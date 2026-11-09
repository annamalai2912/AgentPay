"use client";

import React, { useEffect } from "react";
import { CapturedOrderReceipt } from "@/lib/types";
import { X, Printer, ArrowRight } from "lucide-react";
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D97706", "#EAB308", "#F5F5F7", "#71717A"],
      });
    }
  }, [receipt]);

  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fadeIn font-mono">
      <div className="w-full max-w-lg bg-charcoal border border-hairline-strong rounded-sm p-6 text-bone space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div>
            <span className="text-[10px] text-bronze uppercase font-semibold block">
              STATUS: TRANSACTION_CAPTURED
            </span>
            <h3 className="text-sm font-semibold text-bone uppercase tracking-wider">
              PAYPAL DIGITAL SETTLEMENT LEDGER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone hover:text-bone transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transaction Ledger Table */}
        <div className="p-3.5 bg-obsidian border border-hairline rounded-xs space-y-2 text-[11px] text-stone-light">
          <div className="flex justify-between border-b border-hairline/60 pb-1.5">
            <span className="text-stone">PAYPAL_ORDER_ID:</span>
            <span className="text-bone font-medium break-all">{receipt.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-hairline/60 pb-1.5">
            <span className="text-stone">CAPTURE_HASH:</span>
            <span className="text-bone font-medium break-all">{receipt.captureId}</span>
          </div>
          <div className="flex justify-between border-b border-hairline/60 pb-1.5">
            <span className="text-stone">PAYER_ACCOUNT:</span>
            <span className="text-bone">{receipt.payerEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone">SETTLEMENT_RAIL:</span>
            <span className="text-bronze">PayPal Sandbox (Instant Authorization)</span>
          </div>
        </div>

        {/* Procured Item */}
        <div className="p-3 bg-obsidian border border-hairline rounded-xs flex gap-3 items-center">
          <img
            src={receipt.product.image}
            alt={receipt.product.title}
            className="w-12 h-12 rounded-xs object-cover bg-black border border-hairline"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-stone block uppercase">{receipt.product.brand}</span>
            <h5 className="text-xs font-semibold text-bone truncate">{receipt.product.title}</h5>
            <div className="text-[11px] text-stone">Qty: 1 &bull; Verified Manufacturer Serial</div>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-bone font-tabular">
              ${receipt.dealBreakdown.finalTotal.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Audit Callout Box */}
        <div className="p-3 bg-obsidian border border-hairline rounded-xs text-[11px] text-stone space-y-1">
          <span className="text-bronze font-semibold uppercase block">
            CAPITAL_ARBITRAGE_REPORT:
          </span>
          <p className="leading-relaxed text-stone-light">
            {receipt.savingsSummary}. Verified 30-day merchant return window and full PayPal Buyer Protection coverage.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 px-3 rounded-xs font-medium text-xs bg-charcoal hover:bg-raised border border-hairline text-stone-light hover:text-bone flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT_LEDGER</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNewSearch();
            }}
            className="flex-1 py-2 px-3 rounded-xs font-medium text-xs bg-bone hover:bg-stone-light text-obsidian flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>NEXT_PROCUREMENT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
