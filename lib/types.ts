export interface Product {
  id: string;
  title: string;
  brand: string;
  category: "monitors" | "audio" | "keyboards" | "accessories" | "computing";
  description: string;
  price: number;
  originalPrice: number;
  discountCode?: string;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  specs: Record<string, string>;
  seller: {
    name: string;
    verified: boolean;
    trustScore: number; // 0 - 100
    location: string;
  };
  shippingCost: number;
  shippingDays: string;
  returnDays: number;
  inStock: boolean;
  image: string;
  highlight?: string;
}

export type StepStatus = "thinking" | "tool_call" | "decision" | "complete" | "warning";

export interface AgentThoughtStep {
  id: string;
  timestamp: string;
  stepName: string;
  status: StepStatus;
  message: string;
  toolName?: string;
  toolArgs?: Record<string, any>;
  toolResult?: any;
}

export interface DealBreakdown {
  originalPrice: number;
  negotiatedDiscount: number;
  couponCodeUsed?: string;
  subtotal: number;
  estimatedTax: number;
  shipping: number;
  finalTotal: number;
  savingsTotal: number;
}

export interface AgentDecision {
  query: string;
  userBudget: number;
  targetProduct: Product | null;
  alternativeProducts: Product[];
  dealBreakdown: DealBreakdown;
  rationale: string;
  confidenceScore: number; // 0 - 100
  withinBudget: boolean;
  securityChecks: {
    sellerReputationPassed: boolean;
    returnPolicyAcceptable: boolean;
    buyerProtectionEligible: boolean;
    priceSanityVerified: boolean;
  };
  paypalOrderPayload: {
    intent: "CAPTURE";
    purchase_units: Array<{
      reference_id: string;
      description: string;
      amount: {
        currency_code: string;
        value: string;
        breakdown: {
          item_total: { currency_code: string; value: string };
          shipping: { currency_code: string; value: string };
          tax_total: { currency_code: string; value: string };
          discount: { currency_code: string; value: string };
        };
      };
      items: Array<{
        name: string;
        unit_amount: { currency_code: string; value: string };
        quantity: string;
        category: "PHYSICAL_GOODS";
      }>;
    }>;
  };
}

export interface CapturedOrderReceipt {
  orderId: string;
  captureId: string;
  status: string;
  payerName: string;
  payerEmail: string;
  createTime: string;
  product: Product;
  dealBreakdown: DealBreakdown;
  paymentSource: string;
  savingsSummary: string;
}

