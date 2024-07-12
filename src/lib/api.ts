import { Profile } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getProfile(): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/api/profile`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
}

export async function updateProfile(profile: Profile): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  return response.json();
}
