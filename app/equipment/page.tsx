import { getEquipmentAction } from "@/app/actions/equipment";
import EquipmentPageClient from "./EquipmentPageClient";

interface EquipmentPageProps {
  searchParams: Promise<{ userId?: string }>;
}

export default async function EquipmentPage({ searchParams }: EquipmentPageProps) {
  const params = await searchParams;
  const userId = params.userId || "";
  const initialData = await getEquipmentAction(1, 10, "desc", "", userId);
  
  return <EquipmentPageClient initialData={initialData} />;
}
