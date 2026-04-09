import type { ClientEquipment } from "@/types";
import EquipmentCard from "@/components/equipment/EquipmentCard";
import { List, ListItem } from "@mui/material";

interface EquipmentListProps {
  equipment: ClientEquipment[];
}

export default function EquipmentList({ equipment }: EquipmentListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {equipment.map((item) => (
        <ListItem key={String(item._id)} sx={{ p: 0, mb: 1 }}>
          <EquipmentCard equipment={item} />
        </ListItem>
      ))}
    </List>
  );
}
