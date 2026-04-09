"use client";

import type { ClientEquipment } from "@/types";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EquipmentCardProps {
  equipment: ClientEquipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const router = useRouter();
  
  const formattedDate = new Date(equipment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const handleCardClick = () => {
    router.push(`/equipment/${equipment._id}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        boxShadow: 2, 
        width: "100%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: "action.hover",
          transform: "translateY(-2px)"
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
              {equipment.name}
            </Typography>
            <Link href={`/user/${equipment.user._id}`} onClick={(e) => e.stopPropagation()}>
              <Typography variant="body2" color="primary.main" sx={{ cursor: "pointer", textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}>
                by {equipment.user.username}
              </Typography>
            </Link>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {equipment.description}
        </Typography>
        
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          {equipment.brand && (
            <Chip label={equipment.brand} size="small" variant="outlined" />
          )}
          {equipment.type && (
            <Chip label={equipment.type} size="small" variant="outlined" />
          )}
          {equipment.price && (
            <Chip label={equipment.price} size="small" color="primary" variant="outlined" />
          )}
          {equipment.year && (
            <Chip label={equipment.year.toString()} size="small" variant="outlined" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
