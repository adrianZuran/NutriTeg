import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Coba verifikasi lewat Database MySQL
    try {
      const [rows]: any = await db.execute(
        "SELECT * FROM admins WHERE username = ? AND password = ?", 
        [username, password]
      );

      if (rows && rows.length > 0) {
        const cookieStore = await cookies();
        cookieStore.set('admin_token', 'authenticated', { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 // 1 day
        });
        return NextResponse.json({ success: true });
      }
    } catch (dbError) {
      console.error("Database query failed, falling back to ENV:", dbError);
    }

    // 2. Fallback (Cadangan) jika tabel admins di DB belum dibuat
    const validUser = process.env.ADMIN_USERNAME || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === validUser && password === validPass) {
      const cookieStore = await cookies();
      cookieStore.set('admin_token', 'authenticated', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Username atau password salah" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return NextResponse.json({ success: true });
}
