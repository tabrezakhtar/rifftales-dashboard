import 'server-only';
import type { Types } from "mongoose";

export interface BanRecord {
  date: Date;
  reason: string;
  unbannedDate: Date | null;
}

export interface ServerUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  banHistory?: BanRecord[];
  isBanned?: () => boolean;
}
