import { Box, Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { banUserAction, unbanUserAction } from "@/app/actions/users";

interface BanUserFormProps {
  userId: string;
  isBanned: boolean;
}

export default function BanUserForm({ userId, isBanned }: BanUserFormProps) {
  const banAction = async (formData: FormData) => {
    "use server";
    const reason = formData.get("reason") as string;
    await banUserAction(userId, reason);
  };

  const unbanAction = async () => {
    "use server";
    await unbanUserAction(userId);
  };

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {isBanned ? "Unban User" : "Ban User"}
        </Typography>

        {isBanned ? (
          <Box component="form" action={unbanAction}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This user is currently banned. Click the button below to unban them.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Unban User
            </Button>
          </Box>
        ) : (
          <Box component="form" action={banAction}>
            <TextField
              name="reason"
              label="Ban Reason"
              multiline
              rows={3}
              fullWidth
              placeholder="Enter reason for banning this user..."
              sx={{ mb: 2 }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
            >
              Ban User
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
