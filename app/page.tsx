import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

async function login(formData: FormData) {
  "use server";
  
  // No authentication logic yet - just redirect to comments
  redirect("/comments");
}

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ width: "100%", p: 5, bgcolor: "background.paper", borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box sx={{ bgcolor: "primary.main", borderRadius: "50%", p: 1.5, mb: 2 }}>
            <LockOutlinedIcon sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            RiffTales Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Please log in to continue
          </Typography>
        </Box>
        
        <form action={login}>
          <Box sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              size="medium"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              size="medium"
            />
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5, fontSize: "1rem", fontWeight: 600 }}
          >
            Log in
          </Button>
        </form>
      </Box>
    </Container>
  );
}
