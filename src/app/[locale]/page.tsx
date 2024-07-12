"use client";
import { Suspense, ReactElement } from "react";
import { Grid } from "@mui/material";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";
import LanguageSelector from "../components/LanguageSelector";
import ThemeToggle from "../components/ThemeToggle";
import { getProfile } from "@/lib/api";
import Navbar from "../components/Navbar";

export default function Home(): ReactElement {
 
  return (
    <main className="page-container">
      <Navbar></Navbar>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12} sm={6}>
          <h1 className="text-3xl font-bold">User Profile</h1>
        </Grid>
        
      </Grid>
      <Grid container spacing={2} className="">
        <Grid item xs={12} md={6}>
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileDisplay />
          </Suspense>
        </Grid>
      </Grid>
    </main>
  );
}
