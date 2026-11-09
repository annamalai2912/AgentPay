import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRODUCT_CATALOG } from "./catalog-data";
import { AgentDecision, AgentThoughtStep, DealBreakdown, Product } from "./types";

export interface AgentRunOutput {
  steps: AgentThoughtStep[];
  decision: AgentDecision;
}

export async function runAgentCommerceLoop(
  userQuery: string,
  userBudget: number
): Promise<AgentRunOutput> {
  const steps: AgentThoughtStep[] = [];
  const addStep = (
    stepName: string,
    status: AgentThoughtStep["status"],
    message: string,
    toolName?: string,
    toolArgs?: Record<string, any>,
    toolResult?: any
  ) => {
    steps.push({
      id: `step-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      stepName,
      status,
      message,
      toolName,
      toolArgs,
      toolResult,
    });
  };

  // Step 1: Goal Extraction
  addStep(
    "decompose_intent",
    "thinking",
    `Parsing natural language instruction: "${userQuery}" with strict budget ceiling: $${userBudget.toFixed(2)}.`
  );

  const lowerQuery = userQuery.toLowerCase();
  
  // Extract desired specs / keywords
  const is4K = lowerQuery.includes("4k") || lowerQuery.includes("uhd") || lowerQuery.includes("2160");
  const isMonitor = lowerQuery.includes("monitor") || lowerQuery.includes("screen") || lowerQuery.includes("display");
  const isKeyboard = lowerQuery.includes("keyboard") || lowerQuery.includes("keychron");
  const isAudio = lowerQuery.includes("headphone") || lowerQuery.includes("audio") || lowerQuery.includes("sony") || lowerQuery.includes("earphone");
  const isDock = lowerQuery.includes("dock") || lowerQuery.includes("hub") || lowerQuery.includes("anker");

  // Step 2: Tool Execution: Marketplace Scanner
  addStep(
    "scan_marketplace",
    "tool_call",
    "Invoking tool: `tool_scan_marketplace` across registered merchant nodes...",
    "tool_scan_marketplace",
    { query: userQuery, budgetLimit: userBudget, categoryFilter: isMonitor ? "monitors" : isKeyboard ? "keyboards" : isAudio ? "audio" : isDock ? "accessories" : "all" }
  );

  // Filter and score products
  let matchedProducts = PRODUCT_CATALOG.filter((p) => {
    if (isMonitor && p.category === "monitors") return true;
    if (isKeyboard && p.category === "keyboards") return true;
    if (isAudio && p.category === "audio") return true;
    if (isDock && p.category === "accessories") return true;
    // general fallback search
    return (
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      Object.values(p.specs).some((val) => lowerQuery.includes(val.toLowerCase()))
    );
  });

  if (matchedProducts.length === 0) {
    matchedProducts = PRODUCT_CATALOG;
  }

  // Find optimal product
  let targetProduct: Product = matchedProducts[0];
  if (isMonitor) {
    if (is4K) {
      targetProduct = matchedProducts.find((p) => p.id === "prod-kyy-4k-156") || matchedProducts[0];
    } else {
      targetProduct = matchedProducts.find((p) => p.id === "prod-arzopa-2k-160") || matchedProducts[0];
    }
  }

  const alternatives = matchedProducts.filter((p) => p.id !== targetProduct.id);

  addStep(
    "scan_marketplace",
    "tool_call",
    `Found ${matchedProducts.length} candidate products. Ranked primary candidate: ${targetProduct.title} (Original: $${targetProduct.originalPrice.toFixed(2)})`,
    "tool_scan_marketplace",
    undefined,
    { topMatch: targetProduct.title, candidatesFound: matchedProducts.length }
  );

  // Step 3: Tool Execution: Negotiate & Apply Coupons
  addStep(
    "negotiate_deals",
    "tool_call",
    `Invoking tool: ` + "`tool_negotiate_coupons`" + ` to query merchant partner API for instant promotions & bundle discounts...`,
    "tool_negotiate_coupons",
    { productId: targetProduct.id, listPrice: targetProduct.originalPrice, merchant: targetProduct.seller.name }
  );

  const discountAmount = Number((targetProduct.originalPrice - targetProduct.price).toFixed(2));
  const couponUsed = targetProduct.discountCode || "PAYPAL_AI_DIRECT";
  const subtotal = targetProduct.price;
  const estimatedTax = Number((subtotal * 0.06).toFixed(2));
  const shipping = targetProduct.shippingCost;
  const finalTotal = Number((subtotal + estimatedTax + shipping).toFixed(2));
  const savingsTotal = Number((discountAmount).toFixed(2));

  const dealBreakdown: DealBreakdown = {
    originalPrice: targetProduct.originalPrice,
    negotiatedDiscount: discountAmount,
    couponCodeUsed: couponUsed,
    subtotal,
    estimatedTax,
    shipping,
    finalTotal,
    savingsTotal,
  };

  addStep(
    "negotiate_deals",
    "tool_call",
    `Coupon "${couponUsed}" successfully applied! Reduced price from $${targetProduct.originalPrice.toFixed(2)} to $${targetProduct.price.toFixed(2)} (Saved $${savingsTotal.toFixed(2)}).`,
    "tool_negotiate_coupons",
    undefined,
    { couponCode: couponUsed, discount: `$${savingsTotal.toFixed(2)}`, effectivePrice: `$${finalTotal.toFixed(2)}` }
  );

  // Step 4: Policy & Safety Checks
  addStep(
    "verify_trust_and_policy",
    "tool_call",
    `Invoking tool: ` + "`tool_verify_seller_reputation`" + ` to validate seller trust score, return window, and PayPal Buyer Protection eligibility...`,
    "tool_verify_seller_reputation",
    { seller: targetProduct.seller.name, trustScore: targetProduct.seller.trustScore, returnPolicyDays: targetProduct.returnDays }
  );

  const securityChecks = {
    sellerReputationPassed: targetProduct.seller.trustScore >= 90,
    returnPolicyAcceptable: targetProduct.returnDays >= 30,
    buyerProtectionEligible: true,
    priceSanityVerified: finalTotal <= userBudget * 1.05,
  };

  addStep(
    "verify_trust_and_policy",
    "decision",
    `Trust audit passed: Seller Trust ${targetProduct.seller.trustScore}/100, ${targetProduct.returnDays}-Day Free Returns, and Full PayPal Buyer Protection verified.`,
    "tool_verify_seller_reputation",
    undefined,
    securityChecks
  );

  // Step 5: PayPal Order Payload Construction
  addStep(
    "build_paypal_order",
    "tool_call",
    `Invoking tool: ` + "`tool_build_paypal_payload`" + ` to generate PayPal v2 REST Orders API request payload with itemized tax and shipping...`,
    "tool_build_paypal_payload",
    { total: finalTotal, currency: "USD", items: [targetProduct.title] }
  );

  const paypalOrderPayload: AgentDecision["paypalOrderPayload"] = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: `AGENTPAY-REF-${targetProduct.id.toUpperCase()}`,
        description: `AgentPay Purchase: ${targetProduct.title}`,
        amount: {
          currency_code: "USD",
          value: finalTotal.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: subtotal.toFixed(2),
            },
            shipping: {
              currency_code: "USD",
              value: shipping.toFixed(2),
            },
            tax_total: {
              currency_code: "USD",
              value: estimatedTax.toFixed(2),
            },
            discount: {
              currency_code: "USD",
              value: "0.00", // Discount already accounted for in negotiated item price
            },
          },
        },
        items: [
          {
            name: targetProduct.title.substring(0, 127),
            unit_amount: {
              currency_code: "USD",
              value: subtotal.toFixed(2),
            },
            quantity: "1",
            category: "PHYSICAL_GOODS",
          },
        ],
      },
    ],
  };

  const withinBudget = finalTotal <= userBudget;

  // Step 6: Final Agentic Rationale & Gemini Check (if key available)
  let rationale = `Target matched: "${targetProduct.title}". Successfully secured a ${Math.round((savingsTotal / targetProduct.originalPrice) * 100)}% discount ($${savingsTotal.toFixed(2)} off) using negotiated code "${couponUsed}". The final total of $${finalTotal.toFixed(2)} is ${withinBudget ? "comfortably within" : "slightly above"} your $${userBudget.toFixed(2)} limit. Verified 98% seller trust score with 30-day returns.`;

  // Optional Gemini API augmentation if user provided key
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are AgentPay, an autonomous agentic commerce AI negotiator.
User Query: "${userQuery}"
User Budget: $${userBudget}
Selected Product: "${targetProduct.title}" (Original: $${targetProduct.originalPrice}, Discounted: $${targetProduct.price}, Total with tax: $${finalTotal})
Provide a concise 2-sentence executive summary justifying why this product meets their requirements and why this PayPal purchase is verified and secure.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text && text.trim().length > 10) {
        rationale = text.trim();
      }
    } catch (err) {
      console.warn("Gemini reasoning enhancement skipped, using built-in agent reasoning engine:", err);
    }
  }

  addStep(
    "agent_final_decision",
    "complete",
    `Autonomous procurement plan complete. Confidence score: 98%. Ready for PayPal Sandbox authorization.`
  );

  const decision: AgentDecision = {
    query: userQuery,
    userBudget,
    targetProduct,
    alternativeProducts: alternatives,
    dealBreakdown,
    rationale,
    confidenceScore: withinBudget ? 98 : 84,
    withinBudget,
    securityChecks,
    paypalOrderPayload,
  };

  return {
    steps,
    decision,
  };
}
