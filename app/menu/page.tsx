"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Flame, DollarSign, Filter, Info } from "lucide-react";
import { dummyMenus } from "@/lib/dummyData";
import { MenuItem } from "@/types";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [sortBy, setSortBy] = useState<string>("default");

  const categories = ["Semua", "Sayur", "Lauk", "Karbohidrat", "Sambal", "Minuman"];

  const filteredMenus = dummyMenus
    .filter((menu) => {
      const matchesSearch = menu.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || menu.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.harga - b.harga;
      if (sortBy === "price_desc") return b.harga - a.harga;
      if (sortBy === "cal_asc") return a.kalori - b.kalori;
      if (sortBy === "cal_desc") return b.kalori - a.kalori;
      return 0;
    });

  return (
    <div className="min-h-screen bg-warteg-bg dark:bg-warteg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-warteg-text dark:text-warteg-dark-text mb-4">
            Menu <span className="text-nutriteg-green-dark">Warteg</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pilih hidangan favoritmu. Setiap menu dilengkapi dengan informasi nilai gizi untuk membantumu menjaga pola makan sehat.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-white dark:bg-warteg-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-warteg-text dark:text-warteg-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark focus:border-nutriteg-green-dark transition-colors sm:text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2.5 pl-3 pr-8 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark focus:border-nutriteg-green-dark dark:text-gray-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full py-2.5 pl-3 pr-8 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark focus:border-nutriteg-green-dark dark:text-gray-200"
              >
                <option value="default">Urutkan</option>
                <option value="price_asc">Harga (Rendah ke Tinggi)</option>
                <option value="price_desc">Harga (Tinggi ke Rendah)</option>
                <option value="cal_asc">Kalori (Rendah ke Tinggi)</option>
                <option value="cal_desc">Kalori (Tinggi ke Rendah)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu, index) => (
              <MenuCard key={menu.id} menu={menu} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Tidak ada menu yang sesuai dengan pencarian Anda.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function MenuCard({ menu, index }: { menu: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-warteg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={menu.gambar}
          alt={menu.nama}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-warteg-text dark:text-white">
          {menu.kategori}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-warteg-text dark:text-warteg-dark-text leading-tight group-hover:text-nutriteg-green-dark transition-colors">
            {menu.nama}
          </h3>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {menu.deskripsi}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg text-nutriteg-green-dark">
              Rp {menu.harga.toLocaleString('id-ID')}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-md">
              <Flame className="w-4 h-4" />
              {menu.kalori} Kkal
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="text-center">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Gula</div>
              <div className="text-xs font-semibold text-warteg-text dark:text-warteg-dark-text">{menu.gula}g</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Protein</div>
              <div className="text-xs font-semibold text-warteg-text dark:text-warteg-dark-text">{menu.protein}g</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Lemak</div>
              <div className="text-xs font-semibold text-warteg-text dark:text-warteg-dark-text">{menu.lemak}g</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Karbo</div>
              <div className="text-xs font-semibold text-warteg-text dark:text-warteg-dark-text">{menu.karbohidrat}g</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
