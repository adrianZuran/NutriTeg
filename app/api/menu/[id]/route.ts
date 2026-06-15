import { NextResponse } from "next/server";
import { dummyMenus } from "@/lib/dummyData";

// PUT /api/menu/[id] (Update Menu)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();

    // Simulate finding and updating the menu
    const menuIndex = dummyMenus.findIndex(m => m.id === id);
    if (menuIndex === -1) {
      return NextResponse.json({ success: false, message: "Menu not found" }, { status: 404 });
    }

    /*
    MySQL implementation:
    const { nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori } = body;
    const [result] = await db.execute(
      "UPDATE menus SET nama=?, harga=?, kalori=?, gula=?, protein=?, lemak=?, karbohidrat=?, deskripsi=?, gambar=?, kategori=? WHERE id=?",
      [nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori, id]
    );
    if (result.affectedRows === 0) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    */

    return NextResponse.json({ success: true, message: "Menu updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// DELETE /api/menu/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Simulate deleting
    const menuIndex = dummyMenus.findIndex(m => m.id === id);
    if (menuIndex === -1) {
      return NextResponse.json({ success: false, message: "Menu not found" }, { status: 404 });
    }

    /*
    MySQL implementation:
    const [result] = await db.execute("DELETE FROM menus WHERE id=?", [id]);
    if (result.affectedRows === 0) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    */

    return NextResponse.json({ success: true, message: "Menu deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
