"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, PieChart, Activity, AlertCircle } from "lucide-react";
import { dummyMenus } from "@/lib/dummyData";
import { MenuItem, CartItem } from "@/types";

const DAILY_CALORIE_GOAL = 2000;

export default function KalkulatorPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenus = dummyMenus.filter((menu) =>
    menu.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (menu: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const totals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.kalori += item.kalori * item.quantity;
        acc.gula += item.gula * item.quantity;
        acc.protein += item.protein * item.quantity;
        acc.lemak += item.lemak * item.quantity;
        acc.karbohidrat += item.karbohidrat * item.quantity;
        acc.harga += item.harga * item.quantity;
        return acc;
      },
      { kalori: 0, gula: 0, protein: 0, lemak: 0, karbohidrat: 0, harga: 0 }
    );
  }, [cart]);

  const caloriePercentage = Math.min(100, (totals.kalori / DAILY_CALORIE_GOAL) * 100);
  
  let statusColor = "bg-green-500";
  let statusText = "Aman (Rendah)";
  if (totals.kalori > DAILY_CALORIE_GOAL * 1.1) {
    statusColor = "bg-red-500";
    statusText = "Tinggi (Melebihi Batas)";
  } else if (totals.kalori > DAILY_CALORIE_GOAL * 0.8) {
    statusColor = "bg-yellow-500";
    statusText = "Normal (Mendekati Batas)";
  }

  return (
    <div className="min-h-screen bg-warteg-bg dark:bg-warteg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-warteg-text dark:text-warteg-dark-text mb-4">
            Kalkulator <span className="text-nutriteg-green-dark">Nutrisi</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pilih menu makananmu dan lihat total nutrisi yang akan kamu konsumsi. Sesuaikan porsi untuk mencapai target gizimu!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Menu Selection (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-warteg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold mb-4">Pilih Menu</h2>
              <input
                type="text"
                placeholder="Cari makanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-warteg-text dark:text-warteg-dark-text focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark mb-6"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredMenus.map((menu) => (
                  <div
                    key={menu.id}
                    className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-nutriteg-green-dark transition-colors cursor-pointer bg-white dark:bg-warteg-dark-card"
                    onClick={() => addToCart(menu)}
                  >
                    <img src={menu.gambar} alt={menu.nama} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{menu.nama}</h3>
                      <p className="text-xs text-gray-500">{menu.kalori} Kkal</p>
                      <p className="text-xs font-medium text-nutriteg-green-dark">Rp {menu.harga.toLocaleString('id-ID')}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-nutriteg-green-dark/10 text-nutriteg-green-dark flex items-center justify-center hover:bg-nutriteg-green-dark hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output (Right) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-warteg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-nutriteg-green-dark" />
                Ringkasan Nutrisi
              </h2>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Total Kalori</span>
                  <span className="font-bold">{totals.kalori} / {DAILY_CALORIE_GOAL} Kkal</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${caloriePercentage}%` }}
                    className={`h-3 rounded-full transition-all duration-500 ${statusColor}`}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Activity className="w-3.5 h-3.5" />
                  Status: <span className="font-semibold">{statusText}</span>
                </div>
              </div>

              {/* Macronutrients */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1 font-medium">Protein</div>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{totals.protein}g</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                  <div className="text-xs text-red-600 dark:text-red-400 mb-1 font-medium">Lemak</div>
                  <div className="text-lg font-bold text-red-700 dark:text-red-300">{totals.lemak}g</div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1 font-medium">Karbo</div>
                  <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{totals.karbohidrat}g</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1 font-medium">Gula</div>
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{totals.gula}g</div>
                </div>
              </div>

              {/* Selected Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm border-b border-gray-100 dark:border-gray-800 pb-2">Piringmu:</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">Belum ada menu yang dipilih</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.nama}</p>
                            <p className="text-xs text-gray-500">{item.kalori * item.quantity} Kkal</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="font-semibold text-gray-600 dark:text-gray-400">Estimasi Harga</span>
                <span className="font-bold text-xl text-nutriteg-green-dark">
                  Rp {totals.harga.toLocaleString('id-ID')}
                </span>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
