import { getCommentsAction } from "@/app/actions/comments";
import CommentsPageClient from "./CommentsPageClient";

export default async function CommentsPage() {
  const initialData = await getCommentsAction(1, 10, "desc", "");
  
  return <CommentsPageClient initialData={initialData} />;
}