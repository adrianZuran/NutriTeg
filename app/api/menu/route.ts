import { NextResponse } from "next/server";
import { dummyMenus } from "@/lib/dummyData";
import { MenuItem } from "@/types";

// In a real application, you would connect to MySQL here.
// Example: import db from "@/lib/db";

// GET /api/menu
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let menus = [...dummyMenus];

    // Simulate database query with WHERE clause
    if (category) {
      menus = menus.filter(m => m.kategori === category);
    }

    /* 
    MySQL implementation:
    let query = "SELECT * FROM menus";
    if (category) query += ` WHERE kategori = '${category}'`;
    const [rows] = await db.execute(query);
    return NextResponse.json(rows);
    */

    return NextResponse.json({ success: true, data: menus }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// POST /api/menu
export async function POST(request: Request) {
  try {
    const body: Omit<MenuItem, 'id'> = await request.json();

    // Validate input here...
    
    const newMenu: MenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...body
    };

    /*
    MySQL implementation:
    const { nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori } = body;
    const [result] = await db.execute(
      "INSERT INTO menus (nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori]
    );
    */

    return NextResponse.json({ success: true, message: "Menu created", data: newMenu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
