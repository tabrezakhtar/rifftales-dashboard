import { NextResponse } from "next/server";
import { fetchEquipment } from "@/lib/equipment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const sort = (searchParams.get("sort") === "asc" ? "asc" : "desc") as "asc" | "desc";
  const search = searchParams.get("search") || "";
  const userId = searchParams.get("userId") || "";
  const { equipment, total } = await fetchEquipment(page, pageSize, sort, search, userId);
  return NextResponse.json({ equipment, total });
}
