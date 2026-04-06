import type { ClientUser } from "@/types";
import UserCard from "@/components/users/UserCard";
import { List, ListItem } from "@mui/material";

interface UsersListProps {
  users: ClientUser[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <List sx={{ width: "100%" }}>
      {users.map((user) => (
        <ListItem key={String(user._id)} sx={{ p: 0, mb: 1 }}>
          <UserCard user={user} />
        </ListItem>
      ))}
    </List>
  );
}
