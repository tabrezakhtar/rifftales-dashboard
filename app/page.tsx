"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
      <Box sx={{ width: "100%", maxWidth: 800, py: 8, px: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
          style={{ filter: "invert(1)" }} // For dark mode, adjust as needed
        />
        <Box sx={{ mt: 4, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
            Welcome to RiffTales Dashboard <ConstructionIcon sx={{ ml: 2 }} /> Beta
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Manage your comments and explore the features of RiffTales. Get started by viewing comments.
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            href="/comments"
          >
            View Comments
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
