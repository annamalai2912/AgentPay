# 🏆 AgentPay: Autonomous Agentic Commerce Assistant
### *Built for the PayPal AI Hackathon 2026*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PayPal](https://img.shields.io/badge/PayPal-Sandbox%20v2%20REST-003087?logo=paypal&logoColor=white)](https://developer.paypal.com/)
[![AI Engine](https://img.shields.io/badge/AI-Agentic%20Tool%20Calling-10b981?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Render](https://img.shields.io/badge/Deploy-Render%20Ready-black?logo=render&logoColor=white)](render.yaml)

> **AgentPay** is an autonomous AI buyer and negotiator that takes high-level user shopping goals, autonomously scans marketplace catalog nodes, negotiates secret promotional discounts, verifies merchant trust and return policies, and executes secure, guardrail-compliant checkouts using the **PayPal Developer Platform (Orders v2 API)**.

---

## 🎯 Target Hackathon Categories
1. **Best Use of Agentic Commerce ($5,000)** - Autonomous multi-step tool-use agent performing price comparison, merchant verification, coupon negotiation, spending guardrails, and programmatic checkout.
2. **Best Use of PayPal + AI ($5,000)** - Deep integration of PayPal Orders v2 REST API (create, capture, buyer protection) paired with autonomous AI reasoning and structured tool calling.
3. **Render Sponsor Prize** - Fully deployable on Render with included `render.yaml` blueprint.
4. **Grand Prizes (1st: $12k, 2nd: $8k, 3rd: $5k)**.

---

## 🚀 Key Features

* **🧠 Multi-Step Autonomous Reasoning Loop**:
  * `decompose_intent`: Extracts specifications, constraints, and budget limit.
  * `tool_scan_marketplace`: Queries distributed inventory nodes for optimal hardware matches.
  * `tool_negotiate_coupons`: Automatically retrieves and applies merchant promotional codes.
  * `tool_verify_seller_reputation`: Audits seller trust score (≥90%), 30-day return window, and PayPal Buyer Protection eligibility.
  * `tool_build_paypal_payload`: Constructs itemized v2 PayPal REST Orders payloads with automated tax and shipping calculations.

* **💳 Full PayPal Developer Integration**:
  * **Orders v2 REST API** (`/v2/checkout/orders` and `/v2/checkout/orders/{id}/capture`).
  * **Official React PayPal SDK** (`@paypal/react-paypal-js`) with interactive Smart Payment Buttons.
  * **Zero-Setup Judge Fast Pass**: 1-click sandbox simulation mode so evaluators can test the entire loop instantly without configuring `.env` keys.
  * **Live Sandbox Support**: Easily connect your own PayPal Sandbox Client ID & Secret.

* **🛡️ Autonomous Spending Guardrails**:
  * Users set an explicit budget cap (e.g., $150).
  * If an order total exceeds the limit, the agent triggers an interactive authorization guardrail requiring explicit user consent before PayPal checkout.

* **🧾 Intelligent Digital Receipt & Ledger**:
  * Post-capture receipt with official PayPal Order ID and Capture ID.
  * AI-generated savings breakdown report detailing exact dollar amounts saved through autonomous negotiation.
  * Print and PDF download support.

---

## 🏗️ Architecture

```
User Prompt ("Find me a 4K monitor under $150...")
               │
               ▼
┌────────────────────────────────────────────────────────┐
│               AgentPay Autonomous Engine                │
│                                                        │
│  [1. Decompose] ──► [2. Scan Catalog] ──► [3. Negotiate]
│          │                   │                   │
│          ▼                   ▼                   ▼
│  [4. Trust Audit] ──► [5. Guardrail Check] ──► [6. PayPal Order]
└────────────────────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────────────────┐
│             PayPal Developer Platform (v2)             │
│                                                        │
│   • /api/paypal/create-order  ──► PayPal Orders API    │
│   • /api/paypal/capture-order ──► Instant Settlement   │
│   • PayPal Smart Buttons      ──► Secure Buyer Wallet  │
└────────────────────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────────────────┐
│        AI Digital Receipt & Transaction Ledger         │
│     (Order ID, Capture ID, Savings Audit, Confetti)    │
└────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start for Judges (Local Run)

AgentPay requires **Node.js 18+** (tested on Node 20 and 22).

### 1. Clone & Install
```bash
git clone https://github.com/your-username/agentpay-commerce.git
cd agentpay-commerce
npm install
```

### 2. Configure Environment (Optional!)
AgentPay includes **Zero-Friction Fast Pass** mode out of the box, meaning you can run it without setting any API keys! 

To test with your own PayPal Sandbox or Google Gemini keys:
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment on Render (Sponsor Track)

AgentPay is pre-configured with a `render.yaml` Blueprint.

1. Fork this repository on GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** -> **Blueprint**.
3. Connect your repository.
4. Render will automatically detect `render.yaml`, build the Next.js production bundle, and launch the service with HTTPS.

---

## 🧪 Demo Test Scenarios

Try these pre-configured prompts in the UI:
1. **🖥️ 4K Portable Monitor under $150**:
   - *Prompt:* `"Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate/find the best bundle deal, and checkout."`
   - *Result:* Finds KYY 15.6" 4K UHD, negotiates promo `AGENTDEAL25` (saves $50), audits 98% seller trust score, and prepares PayPal order.
2. **⌨️ Custom Mechanical Keyboard under $130**:
   - *Prompt:* `"Find me an ergonomic custom mechanical keyboard with hot-swappable switches under $130..."`
3. **🎧 Sony WH-1000XM5 Headphones under $300**:
   - *Prompt:* `"Find Sony WH-1000XM5 wireless noise cancelling headphones under $300..."`
4. **🛡️ Spending Limit Guardrail Test**:
   - Set the budget slider to `$100` and search for the 4K monitor. Watch the agent flag the safety override guardrail!

---

## 📜 License
This project is open-source under the [MIT License](LICENSE).

