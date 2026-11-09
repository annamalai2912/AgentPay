"use client";

import React from "react";
import { Product, DealBreakdown } from "@/lib/types";
import { ArrowRight, Check } from "lucide-react";

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
  const discountAmount = product.originalPrice - product.price;
  const effectiveDeal: DealBreakdown = dealBreakdown || {
    originalPrice: product.originalPrice,
    negotiatedDiscount: discountAmount,
    couponCodeUsed: product.discountCode || "PAYPAL_DIRECT",
    subtotal: product.price,
    estimatedTax: Number((product.price * 0.06).toFixed(2)),
    shipping: product.shippingCost,
    finalTotal: Number((product.price * 1.06 + product.shippingCost).toFixed(2)),
    savingsTotal: Number(discountAmount.toFixed(2)),
  };

  return (
    <div
      className={`rounded-sm transition-colors border flex flex-col justify-between ${
        isPrimary
          ? "bg-charcoal border-hairline-strong"
          : "bg-obsidian border-hairline hover:border-hairline-strong"
      }`}
    >
      <div>
        {/* Header Ribbon */}
        {isPrimary && (
          <div className="bg-obsidian border-b border-hairline px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-bronze font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-bronze rounded-xs" />
              PRIMARY_RECOMMENDED_PROCUREMENT
            </span>
            <span className="text-stone">MATCH_INDEX: 0.98</span>
          </div>
        )}

        {/* Product Image Frame */}
        <div className="relative h-48 w-full bg-black overflow-hidden border-b border-hairline">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-obsidian/90 border border-hairline rounded-xs text-[10px] font-mono text-stone-light">
            <span>SELLER: {product.seller.name}</span>
            <span className="text-bone">({product.seller.trustScore}%)</span>
          </div>

          {product.discountCode && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-bronze/20 text-bronze border border-bronze/40 rounded-xs text-[10px] font-mono font-medium">
              REBATE: {product.discountCode}
            </div>
          )}
        </div>

        {/* Content & Specifications */}
        <div className="p-4 space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone block">
              {product.brand} &bull; SKU: {product.id.toUpperCase()}
            </span>
            <h4 className="text-sm font-semibold text-bone mt-0.5 leading-snug">
              {product.title}
            </h4>
            <p className="text-xs text-stone mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Transparent Pricing Ledger */}
          <div className="p-3 bg-obsidian border border-hairline rounded-xs font-mono text-xs space-y-1.5">
            <div className="flex justify-between text-stone text-[11px]">
              <span>MSRP LIST PRICE:</span>
              <span className="line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-bronze text-[11px]">
              <span>NEGOTIATED REBATE:</span>
              <span>-${effectiveDeal.savingsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone text-[11px]">
              <span>ESTIMATED TAX (6%):</span>
              <span>${effectiveDeal.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone text-[11px]">
              <span>DISPATCH &amp; SHIPPING:</span>
              <span className="text-bone">
                {product.shippingCost === 0 ? "WAIVED (EXPRESS)" : `$${product.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-1.5 border-t border-hairline flex justify-between items-baseline text-bone font-medium">
              <span className="text-[11px]">TOTAL SETTLEMENT:</span>
              <span className="text-base font-semibold font-tabular">
                ${effectiveDeal.finalTotal.toFixed(2)} <span className="text-[10px] text-stone">USD</span>
              </span>
            </div>
          </div>

          {/* Specs Micro-Grid */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              VERIFIED ATTRIBUTES:
            </span>
            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-stone-light">
              {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                <div key={k} className="p-1 bg-obsidian border border-hairline rounded-xs truncate">
                  <span className="text-stone block">{k}:</span>
                  <span className="text-bone">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onCheckout(product, effectiveDeal)}
          className={`w-full py-2.5 px-3 rounded-xs font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            isPrimary
              ? "bg-bone hover:bg-stone-light text-obsidian"
              : "bg-charcoal hover:bg-raised border border-hairline text-bone"
          }`}
        >
          <span>AUTHORIZE VIA PAYPAL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
