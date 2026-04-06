"use server";

import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/User";
import type { ClientUser } from "@/types";
import { fetchUsers } from "@/lib/users";

export async function getUserAction(userId: string): Promise<ClientUser | null> {
  try {
    await dbConnect();
    
    const user = await UserModel.findById(userId).lean();
    
    if (!user) {
      return null;
    }

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUsersAction(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = ""
) {
  return await fetchUsers(page, pageSize, sort, search);
}
