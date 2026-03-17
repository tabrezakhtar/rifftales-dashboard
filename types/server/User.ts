import type { Types } from "mongoose";

export interface ServerUser {
  _id: Types.ObjectId;
  username: string;
}
