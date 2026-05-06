"use client";

import { Container, Typography, Button, Box, TextField, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/comments");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

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
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              size="medium"
              disabled={loading}
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
              disabled={loading}
            />
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.5, fontSize: "1rem", fontWeight: 600 }}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
