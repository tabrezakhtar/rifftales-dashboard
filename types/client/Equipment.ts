import type { ClientUser } from "@/types/client/User";

export interface ClientEquipment {
  _id: string;
  user: ClientUser;
  name: string;
  price?: string;
  type?: string;
  description: string;
  brand?: string;
  images?: string[];
  year?: number;
  date: string;
}
