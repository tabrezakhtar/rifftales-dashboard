"use server";

import { fetchComments } from "@/lib/comments";
import dbConnect from "@/lib/mongodb";
import CommentModel from "@/models/Comment";
import "@/models/User";
import type { ClientComment, ServerComment } from "@/types";

export async function getCommentsAction(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = "",
  userId: string = ""
) {
  return await fetchComments(page, pageSize, sort, search, userId);
}

export async function getCommentAction(commentId: string): Promise<ClientComment | null> {
  try {
    await dbConnect();
    
    const comment = await CommentModel
      .findById(commentId)
      .populate("user", "username email")
      .lean()
      .exec();
    
    if (!comment) {
      return null;
    }

    const serverComment = comment as ServerComment;

    return {
      _id: serverComment._id.toString(),
      equipmentId: serverComment.equipmentId.toString(),
      user: {
        _id: serverComment.user._id.toString(),
        username: serverComment.user.username,
        email: serverComment.user.email,
      },
      text: serverComment.text,
      date: serverComment.date,
    };
  } catch (error) {
    console.error("Error fetching comment:", error);
    return null;
  }
}
