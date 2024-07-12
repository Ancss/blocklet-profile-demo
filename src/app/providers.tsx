"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as DidThemesProvider } from '@did-connect/react';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { CustomSnackbarProvider } from "./components/Snackbar";
import { useTheme } from "next-themes";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ThemeHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = useSelector((state: any) => state.theme.mode);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <DidThemesProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <ThemeHandler>{children}</ThemeHandler>
          </QueryClientProvider>
        </NextThemesProvider>
      </DidThemesProvider>
    </Provider>
  );
}
