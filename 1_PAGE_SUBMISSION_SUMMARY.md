# 📄 AgentPay: 1-Page Hackathon Executive Summary

**Project:** AgentPay — Autonomous Agentic Commerce Assistant  
**Event:** PayPal AI Hackathon 2026 (Devpost)  
**Target Tracks:** 
- 🏆 Best Use of Agentic Commerce ($5,000)
- 🏆 Best Use of PayPal + AI ($5,000)
- 🏆 Render Sponsor Prize ($2,500)
- 🏆 Main Overall Prizes (1st: $12k, 2nd: $8k, 3rd: $5k)

---

## 💡 The Core Problem & Solution
* **Problem:** Online commerce is fragmented. Buyers waste hours comparing specifications, searching for valid coupons, verifying seller authenticity, and manually checking out.
* **Solution:** **AgentPay** is an autonomous agentic buyer. Users state a conversational procurement goal with a budget ceiling. The agent autonomously parses requirements, searches verified merchant stores, applies negotiated rebates, audits seller trust scores (&ge;90%), and executes programmatic checkout via the **PayPal Orders v2 REST API**.

---

## 🧠 Autonomous Agentic Commerce Architecture

```
User Intent: "Find 4K portable monitor under $150..."
      │
      ▼
┌────────────────────────────────────────────────────────┐
│             AgentPay Autonomous Engine                │
│                                                        │
│  [decompose_intent]  ──► Extracts specs & budget cap  │
│  [scan_marketplace] ──► Searches verified merchants    │
│  [negotiate_coupons] ──► Applies $50 partner rebate    │
│  [verify_trust]      ──► 98% seller score & 30d return │
│  [build_paypal_order]──► Generates Orders v2 payload   │
└────────────────────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────────────────────┐
│             PayPal Developer Platform (v2)             │
│                                                        │
│  • Orders v2 API: /v2/checkout/orders & capture        │
│  • PayPal Smart Payment Buttons (Official React SDK)   │
│  • Programmatic Buyer Protection verification          │
│  • Fast-Pass Mode (1-click sandbox testing for judges) │
└────────────────────────────────────────────────────────┘
      │
      ▼
┌────────────────────────────────────────────────────────┐
│            Digital Settlement & Savings Ledger         │
│  (PayPal Order ID, Capture ID, $50 Arbitrage Report)   │
└────────────────────────────────────────────────────────┘
```

---

## 🛡️ Anti-Slop & Human-Centric Safeguards
1. **Spending Limit Circuit-Breaker:** Deterministic budget guardrail halts execution if the negotiated total exceeds the user's pre-approved limit, preventing unauthorized financial transactions.
2. **Authentic PayPal UX:** Built to official PayPal design guidelines—clean white and navy styling, zero sci-fi neon orbs, and strict `@phosphor-icons/react` icon standards.
3. **Zero-Setup Evaluator Fast-Pass:** Hackathon judges can test the full end-to-end capture in 1 click without typing sandbox credentials, or seamlessly plug in live `.env.local` keys.

---

## 🎬 1:51 Demonstration Video Script (111 Seconds)

| Timestamp | Visual on Screen | Voiceover Narration |
| :--- | :--- | :--- |
| **0:00 - 0:21** | Show AgentPay workspace with clean PayPal styling and Double-P logo. Smooth mouse movement over header and search bar. | *"Welcome to AgentPay, the autonomous commerce assistant built for the PayPal AI Hackathon 2026. In traditional e-commerce, buyers spend hours researching specifications, testing expired discount coupons, and worrying about merchant legitimacy. AgentPay eliminates this friction by transforming commerce into an autonomous, goal-oriented workflow powered by the PayPal Developer Platform."* |
| **0:21 - 0:43** | Click preset *"🖥️ 4K Portable Monitor ($150)"*, verify budget cap ($150), and click **Launch Autonomous Agent**. | *"Here on the direct AgentPay workspace, we initiate a real-world scenario. We ask the agent: 'Find me a portable monitor under 150 dollars with 4K resolution, check reviews, negotiate the best bundle deal, and checkout.' We lock in a strict budget ceiling of 150 dollars. When we launch the agent, our multi-step reasoning loop executes in real time."* |
| **0:43 - 1:02** | Live Decision Ledger streams tool calls: `tool_scan_marketplace`, `tool_negotiate_coupons` ($50 rebate), `tool_verify_seller_reputation` (98% score). | *"Look at the Decision Ledger on the left. The agent decomposes our prompt into structured tasks. It executes our marketplace scan tool to evaluate vendor inventory, runs our coupon negotiation engine to unlock an exclusive 50 dollar merchant partner rebate, and audits merchant reputation with a 98 percent trust score and guaranteed 30-day return policy."* |
| **1:02 - 1:24** | Inspect recommended KYY 4K OLED Monitor card, specs, and transparent pricing table ($189.99 list price reduced to $148.39). | *"On the right, AgentPay presents the matched product: the KYY 15.6-inch 4K OLED Portable Monitor. The ledger proves full pricing transparency: the original 189 dollar list price is reduced by the negotiated 50 dollar discount to a final settlement of 148 dollars and 39 cents with tax and free express shipping, strictly respecting our 150 dollar spending limit."* |
| **1:24 - 1:38** | Click **PayPal Checkout**, modal opens, budget check verified, click **Capture Order (Fast-Pass Sandbox)**. | *"Now we proceed to checkout. AgentPay securely bridges the transaction to PayPal's Orders v2 REST API. We open the checkout modal, review the spending ceiling safeguard, and authorize the order through PayPal's sandbox."* |
| **1:38 - 1:51** | Confetti triggers, displaying the **Digital Settlement Receipt** with PayPal Order ID and Capture ID. | *"Payment captured! AgentPay instantly issues an immutable digital settlement receipt with PayPal Order ID, Capture ID, and an audit summary. AgentPay is fully open source under the MIT License and ready for judging. Thank you!"* |

---

## 📦 Submission Ready Checklist
- [x] PayPal Orders v2 REST API & Smart Buttons implemented
- [x] Multi-step agent tool calling loop implemented
- [x] Spending limit guardrail circuit breaker implemented
- [x] Clean, authentic PayPal UI (no AI slop, Phosphor icons)
- [x] Production build verified (`0` errors)
- [x] Git repository committed (`main` branch)
- [x] 3:2 Graphic hero thumbnail generated ([`thumbnail.jpg`](file:///e:/projects/pay%20pal%20project/thumbnail.jpg))
- [x] Render deployment blueprint configured (`render.yaml`)
- [x] MIT License and README documentation included
