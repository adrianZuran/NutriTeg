export interface MenuItem {
  id: string;
  nama: string;
  harga: number;
  kalori: number;
  gula: number; // in grams
  protein: number; // in grams
  lemak: number; // in grams
  karbohidrat: number; // in grams
  deskripsi: string;
  gambar: string;
  kategori: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
