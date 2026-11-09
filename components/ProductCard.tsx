"use client";

import React from "react";
import { Product, DealBreakdown } from "@/lib/types";
import {
  Star,
  CheckCircle,
  Truck,
  RotateCcw,
  Tag,
  ShieldCheck,
  CreditCard,
  Zap,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  dealBreakdown?: DealBreakdown;
  onCheckout: (product: Product, deal: DealBreakdown) => void;
  isPrimary?: boolean;
}

export function ProductCard({
  product,
  dealBreakdown,
  onCheckout,
  isPrimary = false,
}: ProductCardProps) {
  // Use passed deal breakdown or calculate basic from product
  const discountAmount = product.originalPrice - product.price;
  const effectiveDeal: DealBreakdown = dealBreakdown || {
    originalPrice: product.originalPrice,
    negotiatedDiscount: discountAmount,
    couponCodeUsed: product.discountCode || "PAYPAL_AUTO_SAVINGS",
    subtotal: product.price,
    estimatedTax: Number((product.price * 0.06).toFixed(2)),
    shipping: product.shippingCost,
    finalTotal: Number((product.price * 1.06 + product.shippingCost).toFixed(2)),
    savingsTotal: Number(discountAmount.toFixed(2)),
  };

  return (
    <div
      className={`rounded-2xl transition-all overflow-hidden flex flex-col justify-between ${
        isPrimary
          ? "bg-gradient-to-b from-cyber-card via-slate-900 to-cyber-dark border-2 border-paypal-light/60 shadow-2xl shadow-paypal-blue/20 ring-1 ring-paypal-light/30"
          : "bg-cyber-card/70 border border-cyber-border hover:border-slate-600"
      }`}
    >
      <div>
        {/* Top Highlight Banner */}
        {product.highlight && (
          <div className="bg-gradient-to-r from-paypal-blue via-paypal-darkblue to-cyan-700 px-4 py-1.5 text-xs font-semibold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-paypal-gold" />
              {product.highlight}
            </span>
            {isPrimary && (
              <span className="bg-paypal-gold text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                Agent Top Pick
              </span>
            )}
          </div>
        )}

        {/* Image & Price Area */}
        <div className="relative h-56 w-full bg-slate-950 overflow-hidden group">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

          {/* Seller Trust Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{product.seller.name}</span>
            <span className="text-emerald-400 font-mono font-semibold">({product.seller.trustScore}%)</span>
          </div>

          {/* Coupon Tag */}
          {product.discountCode && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-paypal-gold/90 text-slate-950 font-mono font-bold text-xs shadow-md">
              <Tag className="w-3 h-3" />
              <span>{product.discountCode}</span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-paypal-light font-semibold">
              {product.brand}
            </div>
            <h4 className="text-base font-bold text-white mt-0.5 leading-snug">
              {product.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Pricing & Savings Breakdown */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-white font-mono">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 line-through ml-2 font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Save ${effectiveDeal.savingsTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
              <span>Estimated Tax (6%):</span>
              <span className="text-slate-300 font-mono">${effectiveDeal.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Shipping:</span>
              <span className="text-emerald-400 font-mono font-medium">
                {product.shippingCost === 0 ? "FREE Express" : `$${product.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="text-xs font-semibold text-white flex items-center justify-between pt-1 border-t border-slate-800">
              <span>Estimated Total:</span>
              <span className="text-cyan-300 font-mono text-sm">${effectiveDeal.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              Verified Specifications:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="p-1.5 rounded bg-slate-900/50 border border-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">{key}</span>
                  <span className="text-white font-medium truncate block">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{product.shippingDays}</span>
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{product.returnDays}-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onCheckout(product, effectiveDeal)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
            isPrimary
              ? "bg-gradient-to-r from-paypal-gold via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-paypal-gold text-slate-950 shadow-amber-500/20"
              : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Authorize & Checkout with PayPal</span>
        </button>
      </div>
    </div>
  );
}
