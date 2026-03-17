import 'server-only';
import type { Types } from "mongoose";
import type { ServerUser } from "@/types/server/User";

export interface ServerComment {
  _id: Types.ObjectId;
  equipmentId: Types.ObjectId;
  user: ServerUser;
  text: string;
  date: string;
}
