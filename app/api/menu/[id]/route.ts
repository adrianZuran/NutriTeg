import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori } = body;
    
    const [result]: any = await db.execute(
      "UPDATE menus SET nama=?, harga=?, kalori=?, gula=?, protein=?, lemak=?, karbohidrat=?, deskripsi=?, gambar=?, kategori=? WHERE id=?",
      [nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Menu updated" }, { status: 200 });
  } catch (error) {
    console.error("Database PUT Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [result]: any = await db.execute("DELETE FROM menus WHERE id=?", [id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Menu deleted" }, { status: 200 });
  } catch (error) {
    console.error("Database DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
