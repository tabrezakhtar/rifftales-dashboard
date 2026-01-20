"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const theme = createTheme({
  palette: {
    mode: "dark", // Dark theme as on MUI"s site
    primary: {
      main: "#1976d2", // Default MUI blue, works in dark mode
    },
    secondary: {
      main: "#9c27b0", // Default purple
    },
    // Dark mode backgrounds are applied automatically
  },
  typography: {
    fontFamily: `var(--font-geist-sans), sans-serif`,
  },
  // Custom components matching MUI"s dark theme style
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}