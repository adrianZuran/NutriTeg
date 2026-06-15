import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-nutriteg-green-light dark:bg-nutriteg-green-darker border-t border-nutriteg-green-dark/20 text-nutriteg-green-darker">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-nutriteg-green-dark p-1.5 rounded-lg group-hover:bg-nutriteg-green-darker transition-colors">
                <UtensilsCrossed className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-warteg-text dark:text-warteg-dark-text">
                NutriTeg
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
              Warteg Modern dengan pendekatan peduli gizi. Makan enak, kenyang, dan tetap sehat dengan mengetahui nutrisi setiap hidangan.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-warteg-text dark:text-warteg-dark-text tracking-wider uppercase mb-4">
              Tautan
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/menu" className="text-sm text-gray-500 hover:text-nutriteg-green-dark transition-colors">
                  Menu Kami
                </Link>
              </li>
              <li>
                <Link href="/kalkulator" className="text-sm text-gray-500 hover:text-nutriteg-green-dark transition-colors">
                  Kalkulator Kalori
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-sm text-gray-500 hover:text-nutriteg-green-dark transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warteg-text dark:text-warteg-dark-text tracking-wider uppercase mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500">
                Jl. Bahagia No. 123, Jakarta Selatan
              </li>
              <li className="text-sm text-gray-500">
                halo@nutriteg.id
              </li>
              <li className="text-sm text-gray-500">
                0812-3456-7890
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} NutriTeg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
