"use client";

import { useActionState } from "react";
import { Box, Button, TextField, Card, CardContent, Typography, Alert } from "@mui/material";
import { banUserAction, unbanUserAction } from "@/app/actions/users";

interface BanUserFormProps {
  userId: string;
  isBanned: boolean;
}

type FormState = {
  success: boolean;
  error?: string;
} | null;

export default function BanUserForm({ userId, isBanned }: BanUserFormProps) {
  const banAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const reason = formData.get("reason") as string;
    const result = await banUserAction(userId, reason);
    return result;
  };

  const unbanAction = async (prevState: FormState): Promise<FormState> => {
    const result = await unbanUserAction(userId);
    return result;
  };

  const [banState, banFormAction, isBanPending] = useActionState(banAction, null);
  const [unbanState, unbanFormAction, isUnbanPending] = useActionState(unbanAction, null);

  const state = isBanned ? unbanState : banState;
  const isPending = isBanned ? isUnbanPending : isBanPending;

  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {isBanned ? "Unban User" : "Ban User"}
        </Typography>

        {state?.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {state.error}
          </Alert>
        )}

        {state?.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {isBanned ? "User has been unbanned successfully" : "User has been banned successfully"}
          </Alert>
        )}

        {isBanned ? (
          <Box component="form" action={unbanFormAction}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This user is currently banned. Click the button below to unban them.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isPending}
              fullWidth
            >
              {isPending ? "Unbanning..." : "Unban User"}
            </Button>
          </Box>
        ) : (
          <Box component="form" action={banFormAction}>
            <TextField
              name="reason"
              label="Ban Reason"
              multiline
              rows={3}
              fullWidth
              placeholder="Enter reason for banning this user..."
              sx={{ mb: 2 }}
              disabled={isPending}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={isPending}
              fullWidth
            >
              {isPending ? "Banning..." : "Ban User"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
