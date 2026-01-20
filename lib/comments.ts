import dbConnect from "@/lib/mongodb";
import CommentModel from "@/models/Comment";
import UserModel from "@/models/User";
import type { Comment } from "@/types";

export async function fetchComments(page: number = 1, pageSize: number = 10, sort: 'asc' | 'desc' = 'desc', search: string = ''): Promise<{ comments: Comment[], total: number }> {
  await dbConnect();

  // Ensure User model is registered before querying
  void UserModel;

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
  
  return { comments: comments as Comment[], total };
}