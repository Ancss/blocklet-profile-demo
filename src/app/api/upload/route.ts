import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("public", "uploads", file.name);
  console.log(path, file.name);
  await writeFile(path, buffer);

  return NextResponse.json({ success: true, path: "/uploads/" + file.name });
}
