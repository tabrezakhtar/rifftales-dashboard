import { NextRequest, NextResponse } from "next/server";
import { fetchUsers } from "@/lib/users";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sort = (searchParams.get("sort") || "asc") as "asc" | "desc";
    const search = searchParams.get("search") || "";

    const result = await fetchUsers(page, pageSize, sort, search);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
