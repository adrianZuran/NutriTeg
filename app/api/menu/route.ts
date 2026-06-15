import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { MenuItem } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = "SELECT * FROM menus";
    const params: any[] = [];
    
    if (category) {
      query += " WHERE kategori = ?";
      params.push(category);
    }
    
    const [rows] = await db.execute(query, params);
    
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error("Database GET Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body: Omit<MenuItem, 'id'> = await request.json();
    const { nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori } = body;
    
    const id = Math.random().toString(36).substr(2, 9);
    
    const [result] = await db.execute(
      "INSERT INTO menus (id, nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori]
    );

    const newMenu = { id, ...body };

    return NextResponse.json({ success: true, message: "Menu created", data: newMenu }, { status: 201 });
  } catch (error) {
    console.error("Database POST Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
