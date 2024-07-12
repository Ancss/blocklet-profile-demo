"use client";
import { Suspense, ReactElement } from "react";
import { Grid } from "@mui/material";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";
import LanguageSelector from "../components/LanguageSelector";
import ThemeToggle from "../components/ThemeToggle";
import { getProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home(): ReactElement {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log({ profile, isLoading, error });
  return (
    <main className="container mx-auto p-4">
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12} sm={6}>
          <h1 className="text-3xl font-bold">User Profile</h1>
        </Grid>
        <Grid item xs={12} sm={6} className="flex justify-end items-center">
          <LanguageSelector />
          <ThemeToggle />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileDisplay profile={profile!} />
          </Suspense>
        </Grid>
      </Grid>
    </main>
  );
}
