import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderPayload } = body;

    if (!orderPayload) {
      return NextResponse.json({ error: "orderPayload is required" }, { status: 400 });
    }

    const orderData = await createPayPalOrder(orderPayload);
    return NextResponse.json(orderData);
  } catch (error: any) {
    console.error("API Create Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}

