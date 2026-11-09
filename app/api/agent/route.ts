import { NextResponse } from "next/server";
import { runAgentCommerceLoop } from "@/lib/ai-agent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, budget } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const budgetNumber = typeof budget === "number" ? budget : parseFloat(budget) || 150;

    const result = await runAgentCommerceLoop(query, budgetNumber);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Agent Loop Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to execute agent loop" },
      { status: 500 }
    );
  }
}

