import dbConnect from "@/lib/mongodb";
import EquipmentModel from "@/models/Equipment";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import type { ClientEquipment, ServerEquipment, ServerUser } from "@/types";

function toClientEquipment(equipment: ServerEquipment & { user: ServerUser }): ClientEquipment {
  return {
    _id: equipment._id.toString(),
    user: {
      _id: equipment.user._id.toString(),
      username: equipment.user.username,
      email: equipment.user.email,
    },
    name: equipment.name,
    price: equipment.price,
    type: equipment.type,
    description: equipment.description,
    brand: equipment.brand,
    images: equipment.images,
    year: equipment.year,
    date: equipment.date.toISOString(),
  };
}

export async function fetchEquipment(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = "",
  userId: string = ""
): Promise<{ equipment: ClientEquipment[]; total: number }> {
  await dbConnect();

  const skip = (page - 1) * pageSize;
  const query: any = {};
  
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    query.user = new mongoose.Types.ObjectId(userId);
  }
  
  const equipment = await EquipmentModel
    .find(query)
    .populate("user")
    .sort({ date: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(pageSize)
    .lean()
    .exec();
  
  const total = await EquipmentModel.countDocuments(query);
  
  return { equipment: (equipment as unknown as Array<ServerEquipment & { user: ServerUser }>).map(toClientEquipment), total };
}

export async function fetchEquipmentById(equipmentId: string): Promise<ClientEquipment | null> {
  await dbConnect();
  
  const equipment = await EquipmentModel
    .findById(equipmentId)
    .populate("user")
    .lean()
    .exec();

  if (!equipment) {
    return null;
  }

  return toClientEquipment(equipment as unknown as ServerEquipment & { user: ServerUser });
}
