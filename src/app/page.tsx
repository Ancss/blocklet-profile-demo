"use client";
import { Suspense } from "react";
import ProfileDisplay from "./components/ProfileDisplay";
import ProfileEdit from "./components/ProfileEdit";
import { getProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileDisplay profile={profile!} />
        <ProfileEdit profile={profile!} />
      </Suspense>
    </main>
  );
}
