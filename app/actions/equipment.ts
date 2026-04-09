"use server";

import { fetchEquipment, fetchEquipmentById } from "@/lib/equipment";

export async function getEquipmentAction(
  page: number = 1,
  pageSize: number = 10,
  sort: "asc" | "desc" = "desc",
  search: string = "",
  userId: string = ""
) {
  return await fetchEquipment(page, pageSize, sort, search, userId);
}

export async function getEquipmentByIdAction(equipmentId: string) {
  return await fetchEquipmentById(equipmentId);
}
