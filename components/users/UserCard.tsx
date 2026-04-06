import type { ClientUser } from "@/types";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

interface UserCardProps {
  user: ClientUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card sx={{ mb: 2, boxShadow: 2, width: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <Box>
            <Link href={`/user/${user._id}`}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, cursor: "pointer", color: "primary.main", textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}>
                {user.username}
              </Typography>
            </Link>
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
