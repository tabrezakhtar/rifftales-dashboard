import { getCommentsAction } from "@/app/actions/comments";
import CommentsPageClient from "./CommentsPageClient";

interface CommentsPageProps {
  searchParams: Promise<{ userId?: string }>;
}

export default async function CommentsPage({ searchParams }: CommentsPageProps) {
  const params = await searchParams;
  const userId = params.userId || "";
  const initialData = await getCommentsAction(1, 10, "desc", "", userId);
  
  return <CommentsPageClient initialData={initialData} />;
}