# 📋 PayPal AI Hackathon: Devpost Submission Package & Video Script

Use this document to quickly fill out your Devpost project submission before the deadline (Thursday, November 12, 12:00 PM PST).

---

## 📌 Devpost Project Profile

### **Project Title**
`AgentPay: Autonomous Agentic Commerce Assistant`

### **Tagline**
`An autonomous AI buyer and negotiator that searches deals, verifies merchant trust, negotiates discounts, and settles orders via PayPal Orders v2 REST API.`

### **Sponsor Prizes Selected**
- `Best Use of Agentic Commerce ($5,000)`
- `Best Use of PayPal + AI ($5,000)`
- `Render ($2,500 Sponsor Prize)`
- `Main Overall Prizes (1st: $12k, 2nd: $8k, 3rd: $5k)`

---

## 📝 Devpost Form Text Sections

### **Inspiration**
Shopping online in 2026 is exhausting. Consumers spend hours comparing technical specifications across tabs, searching for promo codes that usually fail, worrying about dishonest third-party sellers, and manually filling in checkout forms. 

With the emergence of autonomous LLM agents and the robust developer tools of PayPal, we asked: **What if users could simply state their high-level intent and budget, and let an autonomous agent handle the procurement, deal negotiation, risk audit, and checkout?** 

That vision is **AgentPay**—bridging autonomous agentic AI with the global trust and security of the PayPal Developer Platform.

### **What it does**
AgentPay is an autonomous agentic commerce copilot:
1. **Natural Language Procurement:** Users state their goal (e.g., *"Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate the best deal, and checkout"*).
2. **Autonomous Tool-Calling Loop:**
   - Decomposes specifications and extracts strict spending constraints.
   - Invokes `tool_scan_marketplace` to rank products across distributed catalog nodes.
   - Invokes `tool_negotiate_coupons` to retrieve and apply merchant discount codes (saving up to 30%).
   - Invokes `tool_verify_seller_reputation` to inspect seller trust ratings (≥90%), check for 30-day return guarantees, and verify PayPal Buyer Protection.
   - Invokes `tool_build_paypal_payload` to construct an itemized PayPal v2 REST Order.
3. **Autonomous Spending Guardrail:** If an order exceeds the user's pre-approved budget, the agent halts and requests an interactive safety authorization before proceeding.
4. **Programmatic PayPal Checkout:** Integrates official PayPal Smart Payment Buttons (`@paypal/react-paypal-js`) and server-side PayPal v2 Orders API (`/v2/checkout/orders` and capture).
5. **Smart AI Receipt & Savings Ledger:** Generates an itemized receipt with PayPal Order ID, Capture ID, and an AI savings report showing exact dollar savings achieved.

### **How we built it**
- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **PayPal Integration:** PayPal v2 Orders REST API on the backend with automated token caching, combined with `@paypal/react-paypal-js` for Smart Buttons. Supports both live Sandbox credentials and an evaluator Fast Pass mode.
- **AI Agentic Layer:** Tool-calling workflow architecture supporting Google Gemini API (`@google/generative-ai`) with structured JSON schemas and a heuristic reasoning engine.
- **Cloud Infrastructure:** Pre-configured `render.yaml` for instant deployment on Render.

### **Challenges we ran into**
- **Idempotency & Order Precision:** Structuring the PayPal v2 REST Orders payload required strict adherence to currency breakdowns where `item_total + tax_total + shipping - discount` must mathematically equal the authorized amount. We built a dedicated payload generator tool that enforces this consistency.
- **Agentic Guardrails:** Balancing full autonomy with financial safety. We implemented a deterministic spending ceiling check that acts as an unbypassable circuit-breaker before payments can be captured.

### **Accomplishments that we're proud of**
- Zero-friction evaluation for hackathon judges: Evaluators can test the entire autonomous loop in 1-click even without configuring `.env` keys, while also supporting live PayPal Sandbox credentials.
- A beautiful, futuristic cyber-fintech UI that displays the agent's real-time thought stream and function calls with expandable parameters and latency metrics.
- Seamless end-to-end integration from natural language goal to PayPal captured payment and celebratory digital receipt.

### **What we learned**
- How the PayPal Orders v2 REST API handles multi-item breakdowns and capture flows.
- The design principles behind "Agentic Commerce"—giving AI agents transactional autonomy while maintaining human-in-the-loop safety boundaries.

### **What's next for AgentPay**
- Integrating PayPal Subscriptions API for recurring autonomous supplies (e.g., auto-restocking office coffee or printer toner when low).
- Supporting multi-merchant cart bundling and automated dispute resolution with PayPal Webhooks.

### **Built with**
`PayPal Developer Platform`, `PayPal Sandbox Orders v2 API`, `Next.js 14`, `React`, `TypeScript`, `Tailwind CSS`, `Google Gemini API`, `Render`

---

## 🎬 3-Minute Video Demo Script (Step-by-Step)

| Time | Visual on Screen | Spoken Narration |
| :--- | :--- | :--- |
| **0:00 - 0:25** | Show AgentPay landing page with cyber-fintech UI and glowing PayPal badge. | *"Hi everyone, this is AgentPay—an autonomous agentic commerce assistant built for the PayPal AI Hackathon. In traditional e-commerce, buyers waste hours comparing specs, hunting for expired coupons, and worrying about merchant trustworthiness. AgentPay changes that by turning shopping into an autonomous goal-oriented workflow powered by AI and PayPal."* |
| **0:25 - 0:50** | Click on the preset: *"Find me a portable monitor under $150 with 4K resolution..."* and hit **Launch Autonomous Agent**. | *"Let's test it with a real scenario: 'Find me a portable monitor under $150 with 4K resolution, check reviews, negotiate the best deal, and checkout.' When we launch the agent, watch the live decision stream on the left."* |
| **0:50 - 1:25** | Expand the tool call steps in the Agent Decision Stream (`tool_scan_marketplace`, `tool_negotiate_coupons`, `tool_verify_seller_reputation`). | *"The agent decomposes our query and calls `tool_scan_marketplace` to rank products. It discovers the KYY 15.6\" 4K UHD monitor. It then invokes `tool_negotiate_coupons` to retrieve a partner promotion code, saving $50! Next, it runs a trust audit verifying a 98% seller rating and 30-day returns. Finally, it constructs the itemized PayPal Orders payload."* |
| **1:25 - 1:55** | Show the **Spending Limit Guardrail**: adjust the budget slider to $100 and show the warning banner requiring explicit user override. | *"Safety is paramount in Agentic Commerce. Notice our Budget Cap slider. If our budget is set lower than the negotiated total, AgentPay's spending guardrail activates, preventing unauthorized transactions until the user explicitly signs off."* |
| **1:55 - 2:30** | Click **Authorize & Checkout with PayPal**. Show the PayPal Sandbox modal and click **Capture Now**. | *"Now let's proceed to checkout. AgentPay supports official PayPal Smart Payment Buttons as well as our 1-click sandbox Fast Pass. When we authorize, our backend calls PayPal's v2 Orders API to create and capture the transaction with full PayPal Buyer Protection."* |
| **2:30 - 3:00** | Confetti bursts! Display the **Digital Receipt** with PayPal Order ID, Capture ID, and savings report. Mention Render deployment. | *"Payment captured! Confetti celebrates our purchase, and AgentPay issues an authenticated digital receipt complete with PayPal Order ID, Capture ID, and an AI savings report showing our $50 in savings. AgentPay is open-source under the MIT license, ready to deploy to Render, and transforms how commerce is conducted with PayPal and AI. Thank you!"* |

