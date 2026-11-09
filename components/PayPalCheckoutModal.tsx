"use client";

import React, { useState } from "react";
import { Product, DealBreakdown, CapturedOrderReceipt } from "@/lib/types";
import { X, Loader2 } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  dealBreakdown: DealBreakdown | null;
  userBudget: number;
  onPaymentSuccess: (receipt: CapturedOrderReceipt) => void;
}

export function PayPalCheckoutModal({
  isOpen,
  onClose,
  product,
  dealBreakdown,
  userBudget,
  onPaymentSuccess,
}: PayPalCheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [budgetOverride, setBudgetOverride] = useState(false);

  if (!isOpen || !product || !dealBreakdown) return null;

  const isOverBudget = dealBreakdown.finalTotal > userBudget;
  const canProceed = !isOverBudget || budgetOverride;

  const handleFastPassCapture = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderPayload: {
            intent: "CAPTURE",
            purchase_units: [
              {
                reference_id: `AGENTPAY-REF-${product.id.toUpperCase()}`,
                description: `AgentPay Purchase: ${product.title}`,
                amount: {
                  currency_code: "USD",
                  value: dealBreakdown.finalTotal.toFixed(2),
                  breakdown: {
                    item_total: { currency_code: "USD", value: dealBreakdown.subtotal.toFixed(2) },
                    shipping: { currency_code: "USD", value: dealBreakdown.shipping.toFixed(2) },
                    tax_total: { currency_code: "USD", value: dealBreakdown.estimatedTax.toFixed(2) },
                  },
                },
              },
            ],
          },
        }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok) throw new Error(orderData.error || "Order creation failed");

      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.id,
          product,
          dealBreakdown,
        }),
      });

      const captureData = await captureRes.json();
      if (!captureRes.ok) throw new Error(captureData.error || "Order capture failed");

      onPaymentSuccess(captureData.receipt);
    } catch (err: any) {
      console.error("FastPass Capture Error:", err);
      setErrorMsg(err.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn font-mono">
      <div className="w-full max-w-md bg-charcoal border border-hairline-strong rounded-sm p-5 text-bone space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-hairline">
          <div>
            <span className="text-[10px] text-stone uppercase block">CHECKOUT_GATEWAY</span>
            <h3 className="text-xs font-semibold text-bone uppercase tracking-wider">
              PAYPAL ESCROW AUTHORIZATION
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone hover:text-bone transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item Summary */}
        <div className="p-3 bg-obsidian border border-hairline rounded-xs flex gap-3 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 rounded-xs object-cover bg-black border border-hairline"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-stone block uppercase">{product.brand}</span>
            <h4 className="text-xs font-medium text-bone truncate">{product.title}</h4>
            <div className="flex items-center gap-2 mt-0.5 text-[11px]">
              <span className="text-bone font-semibold">${dealBreakdown.finalTotal.toFixed(2)}</span>
              <span className="text-stone line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Spending Guardrail Warning */}
        {isOverBudget && (
          <div className="p-3 bg-obsidian border border-bronze/60 text-xs space-y-1.5 text-stone-light">
            <span className="text-[10px] text-bronze uppercase font-semibold block">
              SPENDING_LIMIT_OVERRIDE_REQUIRED
            </span>
            <p className="text-[11px] text-stone leading-relaxed">
              Order amount (${dealBreakdown.finalTotal.toFixed(2)}) exceeds configured limit (${userBudget.toFixed(2)}).
            </p>
            <label className="flex items-center gap-2 cursor-pointer pt-1 text-[11px] text-bone">
              <input
                type="checkbox"
                checked={budgetOverride}
                onChange={(e) => setBudgetOverride(e.target.checked)}
                className="rounded-xs border-hairline bg-charcoal text-bronze focus:ring-0"
              />
              <span>Explicitly authorize budget override</span>
            </label>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-1 text-[11px] text-stone-light bg-obsidian p-3 rounded-xs border border-hairline">
          <div className="flex justify-between">
            <span className="text-stone">LIST PRICE:</span>
            <span>${product.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-bronze">
            <span>NEGOTIATED REBATE:</span>
            <span>-${dealBreakdown.negotiatedDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone">SUBTOTAL:</span>
            <span>${dealBreakdown.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone">ESTIMATED TAX:</span>
            <span>${dealBreakdown.estimatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone">SHIPPING:</span>
            <span className="text-bone">{dealBreakdown.shipping === 0 ? "WAIVED" : `$${dealBreakdown.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-xs font-semibold text-bone pt-1.5 border-t border-hairline">
            <span>SETTLEMENT DUE:</span>
            <span className="font-tabular">${dealBreakdown.finalTotal.toFixed(2)} USD</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-2.5 bg-obsidian border border-red-900/60 text-red-400 text-[11px]">
            {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleFastPassCapture}
            disabled={!canProceed || isProcessing}
            className="w-full py-2.5 px-3 rounded-xs font-medium text-xs bg-bone hover:bg-stone-light text-obsidian disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>PROCESSING_PAYPAL_CAPTURE...</span>
              </>
            ) : (
              <span>EXECUTE_SANDBOX_SETTLEMENT</span>
            )}
          </button>

          <div className="pt-1">
            <PayPalButtons
              style={{ layout: "horizontal", height: 32, color: "black", shape: "rect", label: "paypal" }}
              disabled={!canProceed || isProcessing}
              createOrder={async () => {
                const res = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderPayload: {
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          reference_id: `AGENTPAY-REF-${product.id.toUpperCase()}`,
                          description: `AgentPay Purchase: ${product.title}`,
                          amount: {
                            currency_code: "USD",
                            value: dealBreakdown.finalTotal.toFixed(2),
                          },
                        },
                      ],
                    },
                  }),
                });
                const data = await res.json();
                return data.id;
              }}
              onApprove={async (data) => {
                const res = await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: data.orderID,
                    product,
                    dealBreakdown,
                  }),
                });
                const captureData = await res.json();
                onPaymentSuccess(captureData.receipt);
              }}
              onError={() => handleFastPassCapture()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
