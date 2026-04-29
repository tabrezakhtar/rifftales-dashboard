"use server";

import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/User";
import type { ClientUser } from "@/types";
import { fetchUsers } from "@/lib/users";
import { revalidatePath } from "next/cache";

export async function getUserAction(userId: string): Promise<ClientUser | null> {
  try {
    await dbConnect();
    
    const user = await UserModel.findById(userId).lean();
    
    if (!user) {
      return null;
    }

    const isBanned = user.banHistory && user.banHistory.length > 0 
      ? user.banHistory[user.banHistory.length - 1].unbannedDate === null
      : false;

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      isBanned,
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

export async function banUserAction(userId: string, reason: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!reason || reason.trim().length === 0) {
      return { success: false, error: "Ban reason is required" };
    }

    await dbConnect();
    
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!user.banHistory) {
      user.banHistory = [];
    }

    // Check if already banned
    if (user.banHistory.length > 0) {
      const latestBan = user.banHistory[user.banHistory.length - 1];
      if (latestBan.unbannedDate === null) {
        return { success: false, error: "User is already banned" };
      }
    }

    user.banHistory.push({
      date: new Date(),
      reason: reason.trim(),
      unbannedDate: null,
    });

    await user.save();
    revalidatePath(`/user/${userId}`);
    revalidatePath("/users");
    
    return { success: true };
  } catch (error) {
    console.error("Error banning user:", error);
    return { success: false, error: "Failed to ban user" };
  }
}

export async function unbanUserAction(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await dbConnect();
    
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!user.banHistory || user.banHistory.length === 0) {
      return { success: false, error: "User has no ban history" };
    }

    const latestBan = user.banHistory[user.banHistory.length - 1];
    if (latestBan.unbannedDate !== null) {
      return { success: false, error: "User is not currently banned" };
    }

    latestBan.unbannedDate = new Date();
    await user.save();
    revalidatePath(`/user/${userId}`);
    revalidatePath("/users");
    
    return { success: true };
  } catch (error) {
    console.error("Error unbanning user:", error);
    return { success: false, error: "Failed to unban user" };
  }
}
