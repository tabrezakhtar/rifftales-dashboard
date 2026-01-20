import type { Comment } from "@/types";
import CommentCard from "@/components/CommentCard";
import { List, ListItem } from "@mui/material";

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment) => (
        <ListItem key={String(comment._id)} sx={{ p: 0, mb: 1 }}>
          <CommentCard comment={comment} />
        </ListItem>
      ))}
    </List>
  );
}
