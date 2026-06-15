"use client";

import Link from "next/link";
import { UtensilsCrossed, Menu as MenuIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/#menu" },
    { name: "Kalkulator", path: "/#kalkulator" },
    { name: "Tentang", path: "/#tentang" },
  ];
  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-[#C1E899]/85 backdrop-blur-md shadow-sm py-0" : "bg-white py-1"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 transition-all duration-300">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/uploads/logo-removebg-preview.png" alt="NutriTeg Logo" className="w-25 auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-nutriteg-green-darker",
                  pathname === link.path
                    ? "text-nutriteg-green-darker font-semibold"
                    : "text-nutriteg-green-dark"
                )}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setShowDevModal(true)}
              className="bg-nutriteg-green-dark text-white px-5 py-2 rounded-full font-semibold hover:bg-nutriteg-green-darker transition-colors"
            >
              Order In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-nutriteg-green-dark hover:text-nutriteg-green-darker transition-colors"
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
                    ? "bg-nutriteg-green-dark/10 text-nutriteg-green-darker font-semibold"
                    : "text-nutriteg-green-dark hover:bg-nutriteg-green-dark/5 hover:text-nutriteg-green-darker"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Dev Modal inside Navbar */}
      {showDevModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDevModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Segera Hadir!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Mohon maaf, fitur pemesanan masih dalam masa pengembangan. Silakan coba lagi nanti!
            </p>
            <button 
              onClick={() => setShowDevModal(false)}
              className="w-full bg-nutriteg-green-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-nutriteg-green-darker transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
