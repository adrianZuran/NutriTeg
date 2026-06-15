import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    
    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
