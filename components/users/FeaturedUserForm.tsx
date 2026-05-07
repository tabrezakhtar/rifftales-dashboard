"use client";

import { Box, Card, CardContent, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { toggleFeaturedUserAction } from "@/app/actions/users";
import { useState, useTransition } from "react";

interface FeaturedUserFormProps {
  userId: string;
  featured: boolean;
}

export default function FeaturedUserForm({ userId, featured }: FeaturedUserFormProps) {
  const [isFeatured, setIsFeatured] = useState(featured);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsFeatured(newValue);
    
    startTransition(async () => {
      const result = await toggleFeaturedUserAction(userId, newValue);
      if (!result.success) {
        // Revert on error
        setIsFeatured(!newValue);
        alert(result.error || "Failed to update featured status");
      }
    });
  };

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Featured User
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Featured users are highlighted and shown prominently in the application.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isFeatured}
              onChange={handleToggle}
              disabled={isPending}
            />
          }
          label={isFeatured ? "This user is featured" : "Mark this user as featured"}
        />
      </CardContent>
    </Card>
  );
}
