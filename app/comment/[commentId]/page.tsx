import { notFound } from "next/navigation";
import { getCommentAction } from "@/app/actions/comments";
import { Container, Typography, Card, CardContent, Box, Chip, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CommentPageProps {
  params: Promise<{
    commentId: string;
  }>;
}

export default async function CommentPage({ params }: CommentPageProps) {
  const { commentId } = await params;

  const comment = await getCommentAction(commentId);

  if (!comment) {
    notFound();
  }

  const formattedDate = new Date(comment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component="a"
        href="/comments"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Comments
      </Button>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Comment Details
      </Typography>
      
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Comment Text
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {comment.text}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Posted By
            </Typography>
            <Link href={`/user/${comment.user._id}`}>
              <Typography variant="h6" sx={{ mt: 1, cursor: "pointer", color: "primary.main", textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}>
                {comment.user.username}
              </Typography>
            </Link>
            {comment.user.email && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {comment.user.email}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Date Posted
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formattedDate}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Equipment ID
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontFamily: "monospace" }}>
              {comment.equipmentId}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="overline" color="text.secondary">
              Comment ID
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: "monospace" }}>
              {comment._id}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
