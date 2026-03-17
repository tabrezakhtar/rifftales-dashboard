import type { ClientUser } from "@/types/client/User";

export interface ClientComment {
  _id: string;
  equipmentId: string;
  user: ClientUser;
  text: string;
  date: string;
}
