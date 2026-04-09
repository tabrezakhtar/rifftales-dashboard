import type { Types } from "mongoose";

export interface ServerEquipment {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  price?: string;
  type?: string;
  description: string;
  brand?: string;
  images?: string[];
  year?: number;
  date: Date;
}
