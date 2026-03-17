import dbConnect from "@/lib/mongodb";
import CommentModel from "@/models/Comment";
import type { ClientComment, ServerComment } from "@/types";

function toClientComment(comment: ServerComment): ClientComment {
  return {
    _id: comment._id.toString(),
    equipmentId: comment.equipmentId.toString(),
    user: {
      ...comment.user,
      _id: comment.user._id.toString(),
    },
    text: comment.text,
    date: comment.date,
  };
}

export async function fetchComments(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = ""
): Promise<{ comments: ClientComment[]; total: number }> {
  await dbConnect();

  const skip = (page - 1) * pageSize;
  const query = search ? { text: { $regex: search, $options: 'i' } } : {};
  
  const comments = await CommentModel
    .find(query)
    .populate('user', 'username')
    .sort({ date: sort === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(pageSize)
    .lean()
    .exec();
  
  const total = await CommentModel.countDocuments(query);
  
  return { comments: (comments as ServerComment[]).map(toClientComment), total };
}