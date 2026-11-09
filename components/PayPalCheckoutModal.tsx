"use client";

import React, { useState } from "react";
import { Product, DealBreakdown, CapturedOrderReceipt } from "@/lib/types";
import { X, Lock, AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
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
            <div>
              <h3 className="text-base font-bold text-paypal-darkblue flex items-center gap-1.5">
                PayPal Sandbox Checkout
              </h3>
              <p className="text-xs text-slate-500">Orders v2 REST API Authorization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-paypal-blue">
              {product.brand}
            </span>
            <h4 className="text-xs font-bold text-slate-900 truncate">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-slate-900">${dealBreakdown.finalTotal.toFixed(2)}</span>
              <span className="text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
              {dealBreakdown.couponCodeUsed && (
                <span className="px-2 py-0.5 rounded-full bg-paypal-gold/30 text-paypal-darkblue text-[10px] font-bold">
                  {dealBreakdown.couponCodeUsed}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Spending Guardrail Warning */}
        {isOverBudget && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5 text-amber-900">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Autonomous Spending Limit Notice</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Final total (${dealBreakdown.finalTotal.toFixed(2)}) exceeds configured limit (${userBudget.toFixed(2)}).
            </p>
            <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs font-semibold text-slate-900">
              <input
                type="checkbox"
                checked={budgetOverride}
                onChange={(e) => setBudgetOverride(e.target.checked)}
                className="rounded text-paypal-blue focus:ring-paypal-blue"
              />
              <span>I authorize this spending budget override</span>
            </label>
          </div>
        )}

        {/* Line Item Breakdown */}
        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex justify-between">
            <span>List Price:</span>
            <span className="font-mono text-slate-800">${product.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Negotiated Discount:</span>
            <span className="font-mono">-${dealBreakdown.negotiatedDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-mono text-slate-800">${dealBreakdown.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax (6%):</span>
            <span className="font-mono text-slate-800">${dealBreakdown.estimatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-mono text-emerald-700 font-semibold">
              {dealBreakdown.shipping === 0 ? "FREE" : `$${dealBreakdown.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
            <span>Authorized Total:</span>
            <span className="text-base font-black text-paypal-darkblue font-mono font-tabular">
              ${dealBreakdown.finalTotal.toFixed(2)} USD
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* Fast Pass 1-Click Sandbox Execution */}
          <button
            onClick={handleFastPassCapture}
            disabled={!canProceed || isProcessing}
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-paypal-text bg-paypal-gold hover:bg-paypal-goldHover disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                <span>Capturing PayPal Sandbox Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-paypal-darkblue" />
                <span>Capture Order (Fast-Pass Sandbox)</span>
              </>
            )}
          </button>

          {/* Official PayPal Buttons Container */}
          <div className="pt-1">
            <PayPalButtons
              style={{ layout: "horizontal", height: 38, color: "gold", shape: "pill", label: "paypal" }}
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

        {/* Footer */}
        <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-paypal-blue" />
          <span>Secured by PayPal Developer Sandbox &bull; Buyer Protection Active</span>
        </div>
      </div>
    </div>
  );
}
