"use client";

import type { ClientUser } from "@/types";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useRouter } from "next/navigation";

interface UserCardProps {
  user: ClientUser;
}

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push(`/user/${user._id}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        boxShadow: 2, 
        width: "100%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        backgroundColor: user.isBanned ? "error.light" : "background.paper",
        borderLeft: user.isBanned ? "4px solid" : "none",
        borderColor: user.isBanned ? "error.main" : "transparent",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: user.isBanned ? "error.light" : "action.hover",
          transform: "translateY(-2px)"
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {user.username}
              </Typography>
              {user.isBanned && (
                <Chip 
                  label="BANNED" 
                  color="error" 
                  size="small" 
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {user.email}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            ID: {user._id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

