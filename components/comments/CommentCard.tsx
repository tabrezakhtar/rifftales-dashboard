import type { ClientComment } from "@/types";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";

interface CommentCardProps {
  comment: ClientComment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const formattedDate = new Date(comment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Card sx={{ mb: 2, boxShadow: 2, width: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
          <Link href={`/user/${comment.user._id}`}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, cursor: 'pointer', color: 'primary.main', textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}>
              {String(comment.user.username)}
            </Typography>
          </Link>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
          {comment.text}
        </Typography>
        {comment.equipmentId && (
          <Chip 
            label={`Equipment ID: ${String(comment.equipmentId)}`} 
            size="small" 
            variant="outlined" 
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
