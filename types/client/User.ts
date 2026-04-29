import "client-only";
export interface ClientUser {
  _id: string;
  username: string;
  email: string;
  isBanned: boolean;
}
