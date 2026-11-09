# 📋 PayPal AI Hackathon 2026: Official Devpost Submission Package

Use this guide to complete the Devpost submission for **AgentPay**. All fields correspond directly to the Devpost submission form screenshots.

---

## 1. General Info & Overview

### **Project Name** *(Limit: 60 characters)*
```text
AgentPay: Autonomous Agentic Commerce Assistant
```
*(48 characters / 60 max)*

### **Elevator Pitch** *(Limit: 200 characters)*
```text
Autonomous AI buyer that researches specs, verifies merchant trust, negotiates rebates, and executes secure checkout via the PayPal Orders v2 REST API.
```
*(152 characters / 200 max)*

### **Project Thumbnail** *(JPG, PNG, GIF, max 5 MB, 3:2 ratio)*
- **File:** `thumbnail.jpg` (located in project root `e:\projects\pay pal project\thumbnail.jpg`)
- **Resolution:** 1200 × 800 px (exact 3:2 aspect ratio, zero letterboxing/clipping)
- **Design:** Official PayPal brand aesthetic (PayPal Navy `#001C48`, clean typography, official Double-P monogram, strictly no AI slop).

---

## 2. About the Project (Markdown Editor Field)

*Copy and paste the entire block below into the Devpost "About the project" Markdown field:*

```markdown
## Inspiration
Online shopping in 2026 is full of friction. Consumers spend hours comparing dense technical specifications across dozens of open tabs, testing expired promo codes that fail at checkout, worrying about questionable third-party merchant reliability, and filling out repetitive checkout forms.

With the rapid emergence of autonomous LLM tool-calling and the robust, global developer infrastructure of PayPal, we asked: **What if users could simply declare their high-level intent and budget, and let an autonomous agent handle the procurement, deal negotiation, risk audit, and checkout?**

That vision is **AgentPay**—bridging autonomous agentic AI with the global trust, buyer protection, and security of the PayPal Developer Platform.

---

## What it does
AgentPay is an autonomous, goal-oriented agentic commerce assistant:

1. **Natural Language Procurement:** Users state their intent in plain English (e.g., *"Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate the best bundle deal, and checkout"*).
2. **Autonomous Tool-Calling Ledger:**
   - **`tool_scan_marketplace`**: Decomposes hardware constraints and scans verified merchant inventory.
   - **`tool_negotiate_coupons`**: Queries merchant partner discount engines to negotiate instant rebates (saving up to $50).
   - **`tool_verify_seller_reputation`**: Audits vendor trust score (≥90%), verifies 30-day return policy, and confirms PayPal Buyer Protection.
   - **`tool_build_paypal_payload`**: Formulates a validated, itemized PayPal v2 REST Order payload.
3. **Hard Spending Guardrails:** A mathematical circuit breaker enforces that total settlement ($148.39) never exceeds the user's pre-approved budget ceiling ($150.00). If violated, the agent halts and requests human authorization.
4. **PayPal Developer Sandbox Checkout:** Integrates official PayPal Smart Payment Buttons (`@paypal/react-paypal-js`) and server-side PayPal v2 Orders API (`/v2/checkout/orders` and capture).
5. **Digital Settlement Receipt:** Generates an itemized receipt with authenticated PayPal Order ID, Capture ID, and an AI savings report.

---

## How we built it
- **Frontend & Architecture:** Next.js 14 (App Router), React 18, Tailwind CSS with grounded PayPal color tokens, and `@phosphor-icons/react` using a strict 20px framework.
- **PayPal Developer Integration:** PayPal Orders v2 REST API (`/v2/checkout/orders`) with automated OAuth 2.0 token caching and `@paypal/react-paypal-js` Smart Payment Buttons. Includes a 1-click Fast-Pass sandbox capture for rapid judging evaluation.
- **Agentic AI Layer:** Multi-turn autonomous tool-calling architecture supporting Google Gemini API (`@google/generative-ai`) and deterministic heuristic fallback engines.
- **Cloud & Deployment:** Automated `render.yaml` blueprint for one-click deployment on Render.

---

## Challenges we ran into
- **Currency & Breakdown Precision:** Structuring the PayPal v2 REST Orders payload requires strict mathematical consistency where `item_total + tax_total + shipping - discount` must equal the authorized total. We engineered a payload generator tool that guarantees currency breakdown integrity.
- **Autonomous Financial Safety:** Balancing agent autonomy with user financial control. We implemented an immutable spending ceiling guardrail that stops the agent if an unexpected fee breaches the budget.

---

## Accomplishments that we're proud of
- **Zero-Friction Hackathon Judging:** Judges can evaluate the entire autonomous commerce loop in 1-click even without setting up API keys, while also supporting live PayPal Sandbox credentials.
- **Clean PayPal Aesthetic:** Completely rejected "AI slop" (no neon purple halos or generic cards); crafted an authentic PayPal-inspired UI with full decision transparency.
- **Live Decision Ledger:** Complete visibility into the agent's thought process, tool arguments, and real-time execution telemetry.

---

## What we learned
- How the PayPal Orders v2 REST API handles itemized breakdowns and capture workflows.
- The core principles of Agentic Commerce: granting AI agents purchasing autonomy while preserving strict human-in-the-loop safety boundaries.

---

## What's next for AgentPay
- **PayPal Subscriptions API:** Autonomous recurring procurement for office supplies (restocking toner or coffee when depleted).
- **Multi-Merchant Cart Bundling:** Procuring multi-item bundles across distinct merchants in a single PayPal transaction.
```

---

## 3. Built With (Tags Field - up to 25 Tags)

*Paste or select these tags in the "Built with" section:*
```text
paypal, paypal-api, paypal-sandbox, nextjs, react, typescript, tailwindcss, ai, agentic-ai, llm, gemini-api, javascript, nodejs, rest-api, ecommerce, fintech, autonomous-agents, prompt-engineering, render, web-development, api-integration, payments, shopping-assistant, phosphor-icons, json
```
*(Exactly 25 tags)*

---

## 4. Video Demonstration & YouTube Details

- **Video File:** `AgentPay_Demo_1m51s.mp4` (in project root)
- **Duration:** Exactly **1:51 min** (111.0 seconds)
- **Resolution:** Full HD 1080p (1920 × 1080, 30 fps)
- **Audio:** Clear voiceover narration + audio-visual synchronization

### YouTube Upload Template:
**Title:**
`AgentPay - Autonomous Agentic Commerce Assistant | PayPal AI Hackathon Demo (1:51)`

**Description:**
```text
AgentPay is an autonomous agentic commerce assistant built for the PayPal AI Hackathon 2026.
It transforms natural language procurement goals into real-world transactions using the PayPal Developer Platform (Orders v2 REST API).

Timestamps:
0:00 - Introduction & The Friction of Modern Shopping
0:18 - Natural Language Intent & Budget Guardrail Setup
0:42 - Live Decision Ledger & Autonomous Tool Execution
1:06 - Transparent Pricing Ledger & Partner Rebate ($50 Off)
1:26 - PayPal Orders v2 REST Integration & Fast-Pass Capture
1:40 - Confetti Celebration & Digital Settlement Receipt

GitHub Repository: https://github.com/Uzuus/agentpay-commerce
Built with: PayPal Developer Platform, Next.js 14, React, TypeScript, Tailwind CSS, Google Gemini API.
```
