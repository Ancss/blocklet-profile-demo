import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updatedProfile = await prisma.profile.update({
      where: { id: data.id },
      data: {
        username: data.username,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
        language: data.language,
        theme: data.theme,
      },
    });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
