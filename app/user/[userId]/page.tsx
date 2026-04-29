import { notFound } from "next/navigation";
import { getUserAction } from "@/app/actions/users";
import { Container, Typography, Card, CardContent, Box, Button, Stack, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentIcon from "@mui/icons-material/Comment";
import BuildIcon from "@mui/icons-material/Build";
import BanUserForm from "@/components/users/BanUserForm";

interface UserPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params;

  const user = await getUserAction(userId);

  if (!user) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        component="a" 
        href="/users" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
          User Profile
        </Typography>
        {user.isBanned && (
          <Chip 
            label="BANNED" 
            color="error" 
            size="medium" 
            sx={{ fontWeight: 600, fontSize: "1rem" }}
          />
        )}
      </Box>
      
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary">
              Username
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user.username}
            </Typography>
          </Box>
          
          {user.email && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" color="text.secondary">
                Email
              </Typography>
              <Typography variant="h6">
                {user.email}
              </Typography>
            </Box>
          )}
          
          <Box>
            <Typography variant="overline" color="text.secondary">
              User ID
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user._id}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 4 }}>
        <BanUserForm userId={user._id} isBanned={user.isBanned} />
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          View User Content
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            component="a"
            href={`/comments?userId=${user._id}`}
            variant="outlined"
            startIcon={<CommentIcon />}
            fullWidth
          >
            View Comments
          </Button>
          <Button
            component="a"
            href={`/equipment?userId=${user._id}`}
            variant="outlined"
            startIcon={<BuildIcon />}
            fullWidth
          >
            View Equipment
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}