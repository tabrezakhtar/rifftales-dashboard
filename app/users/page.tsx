import { getUsersAction } from "@/app/actions/users";
import UsersPageClient from "./UsersPageClient";

export default async function UsersPage() {
  const initialData = await getUsersAction(1, 10, "asc", "");
  
  return <UsersPageClient initialData={initialData} />;
}
