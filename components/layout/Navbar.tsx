"use client";

import Link from "next/link";
import { UtensilsCrossed, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Kalkulator", path: "/kalkulator" },
    { name: "Tentang", path: "/tentang" },
  ];

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-nutriteg-green-dark p-2 rounded-xl group-hover:bg-nutriteg-green-darker transition-colors">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-warteg-text dark:text-warteg-dark-text tracking-tight">
              NutriTeg
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-nutriteg-green-dark",
                  pathname === link.path
                    ? "text-nutriteg-green-dark"
                    : "text-warteg-text/80 dark:text-warteg-dark-text/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/menu"
              className="bg-nutriteg-green-dark text-white px-5 py-2 rounded-full font-semibold hover:bg-nutriteg-green-darker transition-colors"
            >
              Order In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warteg-text dark:text-warteg-dark-text hover:text-nutriteg-green-dark transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === link.path
                    ? "bg-nutriteg-green-dark/10 text-nutriteg-green-dark"
                    : "text-warteg-text/80 dark:text-warteg-dark-text/80 hover:bg-nutriteg-green-dark/5 hover:text-nutriteg-green-dark"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
