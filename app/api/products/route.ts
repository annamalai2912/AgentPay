import { NextResponse } from "next/server";
import { PRODUCT_CATALOG } from "@/lib/catalog-data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category && category !== "all") {
    const filtered = PRODUCT_CATALOG.filter((p) => p.category === category);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(PRODUCT_CATALOG);
}
