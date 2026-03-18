"use server";

import { fetchComments } from "@/lib/comments";

export async function getCommentsAction(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = ""
) {
  return await fetchComments(page, pageSize, sort, search);
}
