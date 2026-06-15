import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-nutriteg-green-dark border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <img src="/uploads/logo.png" alt="NutriTeg Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="font-bold text-lg text-white">
                NutriTeg
              </span>
            </Link>
            <p className="text-white/80 text-sm max-w-xs leading-relaxed">
              Warteg Modern dengan pendekatan peduli gizi. Makan enak, kenyang, dan tetap sehat dengan mengetahui nutrisi setiap hidangan.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Tautan
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/menu" className="text-sm text-white/80 hover:text-white transition-colors">
                  Menu Kami
                </Link>
              </li>
              <li>
                <Link href="/kalkulator" className="text-sm text-white/80 hover:text-white transition-colors">
                  Kalkulator Kalori
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-sm text-white/80 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/80">
                Jl. Bahagia No. 123, Jakarta Selatan
              </li>
              <li className="text-sm text-white/80">
                halo@nutriteg.id
              </li>
              <li className="text-sm text-white/80">
                0812-3456-7890
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-sm text-white/60 text-center">
            &copy; {new Date().getFullYear()} NutriTeg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
