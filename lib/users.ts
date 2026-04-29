import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/User";
import type { ClientUser, ServerUser } from "@/types";

function toClientUser(user: ServerUser): ClientUser {
  const isBanned = user.banHistory && user.banHistory.length > 0 
    ? user.banHistory[user.banHistory.length - 1].unbannedDate === null
    : false;
  
  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    isBanned,
  };
}

export async function fetchUsers(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = ""
): Promise<{ users: ClientUser[]; total: number }> {
  await dbConnect();

  const skip = (page - 1) * pageSize;
  const query = search ? { username: { $regex: search, $options: "i" } } : {};
  
  const users = await UserModel
    .find(query)
    .sort({ username: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(pageSize)
    .lean()
    .exec();
  
  const total = await UserModel.countDocuments(query);
  
  return { users: (users as ServerUser[]).map(toClientUser), total };
}
