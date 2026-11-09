"use client";

import React from "react";
import { Product, DealBreakdown } from "@/lib/types";
import { CheckCircle, Star, Truck, ArrowCounterClockwise, Tag } from "@phosphor-icons/react";

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
    couponCodeUsed: product.discountCode || "PAYPAL_SAVINGS",
    subtotal: product.price,
    estimatedTax: Number((product.price * 0.06).toFixed(2)),
    shipping: product.shippingCost,
    finalTotal: Number((product.price * 1.06 + product.shippingCost).toFixed(2)),
    savingsTotal: Number(discountAmount.toFixed(2)),
  };

  return (
    <div
      className={`rounded-2xl transition-all overflow-hidden flex flex-col justify-between bg-white border ${
        isPrimary
          ? "border-paypal-blue/40 shadow-md shadow-slate-100 ring-2 ring-paypal-blue/10"
          : "border-slate-200 hover:border-slate-300 shadow-xs"
      }`}
    >
      <div>
        {/* Top Recommendation Badge */}
        {isPrimary && (
          <div className="bg-paypal-navy text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🎯 Top Autonomous Match</span>
            </span>
            <span className="bg-paypal-gold text-paypal-text font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Best Value
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-300"
          />

          {/* Seller Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200 text-xs text-slate-800 shadow-xs font-medium">
            <CheckCircle size={16} className="text-emerald-600" />
            <span>{product.seller.name}</span>
            <span className="text-emerald-700 font-semibold font-mono">({product.seller.trustScore}%)</span>
          </div>

          {/* Coupon Pill */}
          {product.discountCode && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-paypal-gold text-paypal-text font-bold text-xs shadow-xs">
              <Tag size={16} />
              <span>{product.discountCode}</span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-slate-800 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 font-medium shadow-xs">
            <Star size={16} weight="fill" className="text-amber-500" />
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-paypal-blue">
              {product.brand}
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
              {product.title}
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Transparent Pricing Table */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-500">Catalog Price:</span>
              <span className="text-slate-400 line-through font-mono">${product.originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-emerald-700 font-semibold">
              <span>Negotiated Rebate:</span>
              <span className="font-mono">-${effectiveDeal.savingsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-slate-500">
              <span>Estimated Tax (6%):</span>
              <span className="font-mono text-slate-700">${effectiveDeal.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-slate-500">
              <span>Shipping:</span>
              <span className="font-semibold text-emerald-600 font-mono">
                {product.shippingCost === 0 ? "FREE Express" : `$${product.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900">Total Settlement:</span>
              <span className="text-lg font-black text-slate-900 font-mono font-tabular">
                ${effectiveDeal.finalTotal.toFixed(2)} <span className="text-xs text-slate-500 font-normal">USD</span>
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Verified Specifications:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">{key}</span>
                  <span className="text-slate-800 font-medium truncate block">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1">
              <Truck size={16} className="text-paypal-blue" />
              <span>{product.shippingDays}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowCounterClockwise size={16} className="text-emerald-600" />
              <span>{product.returnDays}-Day Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official PayPal Checkout Trigger */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onCheckout(product, effectiveDeal)}
          className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-paypal-text bg-paypal-gold hover:bg-paypal-goldHover shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {/* PayPal Monogram in button */}
          <svg className="w-4 h-5" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="italic font-bold">PayPal</span>
          <span className="not-italic font-semibold ml-1">Checkout</span>
        </button>
      </div>
    </div>
  );
}
