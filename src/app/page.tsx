"use client";
import { Suspense } from "react";
import ProfileDisplay from "./components/ProfileDisplay";
import ProfileEdit from "./components/ProfileEdit";
import { getProfile } from "@/lib/api";

export default function Home() {

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileDisplay />
        {/* <ProfileEdit /> */}
      </Suspense>
    </main>
  );
}
