"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, MapPin, Plus, Trash2, UtensilsCrossed, X, ShoppingCart } from "lucide-react";

export default function Home() {
  const [calculatorItems, setCalculatorItems] = useState<any[]>([]);
  const [menuWarteg, setMenuWarteg] = useState<any[]>([]);
  const [selectedMenuForModal, setSelectedMenuForModal] = useState<any | null>(null);
  const [showDevModal, setShowDevModal] = useState(false);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setMenuWarteg(data.data);
        }
      });
  }, []);

  const addCalculatorItem = () => {
    setCalculatorItems([...calculatorItems, { menuIdx: 0, weight: 100 }]);
  };

  const removeCalculatorItem = (index: number) => {
    setCalculatorItems(calculatorItems.filter((_, idx) => idx !== index));
  };

  const updateCalculatorItem = (index: number, field: string, value: number) => {
    const newItems = [...calculatorItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setCalculatorItems(newItems);
  };

  const totalCalories = calculatorItems.reduce((total, item) => {
    if (menuWarteg.length === 0) return 0;
    const menu = menuWarteg[item.menuIdx];
    if (!menu) return total;
    const kaloriPer100g = parseInt(menu.kalori || menu.kcal || 0);
    return total + (kaloriPer100g * item.weight) / 100;
  }, 0);

  const totalPrice = calculatorItems.reduce((total, item) => {
    if (menuWarteg.length === 0) return 0;
    const menu = menuWarteg[item.menuIdx];
    if (!menu) return total;
    return total + (parseInt(menu.harga || 0) * item.weight) / 100;
  }, 0);

  const paketSehat = menuWarteg.filter(m => m.kategori === 'Paket');
  const menuBiasa = menuWarteg.filter(m => m.kategori !== 'Paket');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Sadar hidup sehat hari ini, sebelum sehat menjadi hal yang <span className="text-nutriteg-green-dark">mustahil dicari.</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg text-base md:text-lg leading-relaxed">
              Pola makan sehat bukan berarti makanan hambar dan tak nikmat. Di NutriTeg, kami meracik cita rasa otentik warteg dengan sentuhan sehat dan penuh nutrisi.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDevModal(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-nutriteg-green-dark text-white font-bold hover:bg-nutriteg-green-darker transition-all hover:scale-105 shadow-lg shadow-nutriteg-green-dark/30 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Order Sekarang
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center relative"
          >
            <div className="absolute inset-0 bg-nutriteg-green-light rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" 
              alt="Salad sehat" 
              className="w-full max-w-lg rounded-full object-cover aspect-square shadow-2xl relative z-10 border-8 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Banner */}
      <section className="w-full bg-nutriteg-green-dark py-20 relative overflow-hidden flex items-center justify-center min-h-[300px]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic text-yellow-400 drop-shadow-xl transform -skew-x-6 tracking-tight leading-none">
            MAKAN SEHAT <br/>DIMULAI DARI<br/><span className="text-white">DIRI SENDIRI</span>
          </h2>
        </div>
      </section>

      {/* Menu Paket Sehat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cursive font-bold text-gray-900 mb-4">Pilihan <span className="text-nutriteg-green-dark">Paket Sehat</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-cursive text-xl md:text-2xl">Kami merancang paket khusus yang disesuaikan dengan target kesehatan Anda. Semua telah ditakar kalori dan makronutrisinya.</p>
        </div>
        
        {paketSehat.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paketSehat.map((paket, idx) => (
              <div 
                key={paket.id || idx} 
                className="relative flex flex-col sm:flex-row items-center bg-white rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl p-4 pr-6 sm:pl-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all group cursor-pointer border border-gray-50"
                onClick={() => setSelectedMenuForModal(paket)}
              >
                <div className="w-44 h-44 sm:w-48 sm:h-48 shrink-0 mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.15)] border-[6px] border-white z-10 bg-white">
                  <img src={paket.gambar || paket.img} alt={paket.nama || paket.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-left flex-1 w-full pb-8 sm:py-4">
                  <h3 className="text-2xl font-black text-nutriteg-green-dark mb-2 leading-tight pr-4">{paket.nama || paket.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed pr-8">
                    {paket.protein && paket.protein > 0 ? <span className="font-bold text-gray-800">{paket.protein}g Protein | </span> : ''}{paket.deskripsi || paket.desc}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const originalIdx = menuWarteg.indexOf(paket);
                    if(originalIdx !== -1) {
                      setCalculatorItems([...calculatorItems, { menuIdx: originalIdx, weight: 100 }]);
                      document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-[#7ca34b] hover:bg-nutriteg-green-dark flex items-center justify-center text-white shadow-md transition-colors z-20"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
            <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Belum ada paket sehat yang ditambahkan dari admin.</p>
          </div>
        )}
      </section>

      {/* Menu Warteg Biasa */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center mb-12" id="menu">
            <div>
              <h2 className="text-4xl md:text-5xl text-center font-cursive font-bold text-gray-900 mb-4">Menu <span className="text-nutriteg-green-dark">Warteg</span></h2>
              <p className="text-gray-500 text-center font-cursive text-xl md:text-2xl mt-2">Pilih menu satuan favoritmu dengan rasa otentik khas warteg.</p>
            </div>
           </div>
          
          {menuBiasa.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuBiasa.map((menu, idx) => (
                <div 
                  key={menu.id || idx} 
                  className="bg-white rounded-3xl p-6 text-left flex flex-col hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl border border-gray-100 group cursor-pointer"
                  onClick={() => setSelectedMenuForModal(menu)}
                >
                  <div className="w-full h-40 mb-6 overflow-hidden rounded-2xl">
                    <img src={menu.gambar || menu.img} alt={menu.nama || menu.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{menu.kategori || 'Menu'}</span>
                  <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{menu.nama || menu.name}</h3>
                  <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-2">{menu.deskripsi || menu.desc}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-bold text-gray-900">Rp {(menu.harga || 0).toLocaleString('id-ID')}</div>
                      <div className="text-xs text-nutriteg-green-dark font-bold">{menu.kalori || menu.kcal} Kkal</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const originalIdx = menuWarteg.indexOf(menu);
                        if(originalIdx !== -1) {
                          setCalculatorItems([...calculatorItems, { menuIdx: originalIdx, weight: 100 }]);
                          document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-nutriteg-green-light/30 flex items-center justify-center text-nutriteg-green-dark hover:bg-nutriteg-green-dark hover:text-white transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500 font-medium">Belum ada menu yang ditambahkan dari admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* Kalkulator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center" id="kalkulator">
        <h2 className="text-4xl md:text-5xl font-cursive font-bold text-gray-900 mb-4">Kalkulator <span className="text-nutriteg-green-dark">Kalori Makanan</span></h2>
        <p className="text-gray-500 mb-12 font-cursive text-xl md:text-2xl mt-2">Hitung total kalori dari makanan yang ingin kamu pesan. Sesuaikan porsi dan berat makanannya secara akurat.</p>
        
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nutriteg-green-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="w-full mb-8 space-y-4 relative z-10">
            {menuWarteg.length > 0 ? (
              calculatorItems.length > 0 ? (
                calculatorItems.map((item, idx) => {
                  const selectedMenu = menuWarteg[item.menuIdx];
                  if (!selectedMenu) return null;
                  
                  const kaloriPer100g = parseInt(selectedMenu.kalori || selectedMenu.kcal || 0);
                  const itemKcal = Math.round((kaloriPer100g * item.weight) / 100);

                  return (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 border border-gray-100 p-4 rounded-2xl shadow-sm">
                      <div className="flex-1 w-full md:w-auto">
                        <label className="block text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pilih Menu</label>
                        <select 
                          value={item.menuIdx} 
                          onChange={(e) => updateCalculatorItem(idx, "menuIdx", parseInt(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark transition-all"
                        >
                          {menuWarteg.map((menu, mIdx) => (
                            <option key={mIdx} value={mIdx}>{menu.nama || menu.name} ({menu.kalori || menu.kcal} Kkal/100g)</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="w-full md:w-32">
                        <label className="block text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Berat (gram)</label>
                        <input 
                          type="number" 
                          min="1"
                          value={item.weight} 
                          onChange={(e) => updateCalculatorItem(idx, "weight", parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark transition-all text-center"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center min-w-[100px] bg-white rounded-xl py-2 px-4 border border-gray-100 shadow-sm">
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Kalori</span>
                         <span className="font-black text-nutriteg-green-dark text-lg">{itemKcal}</span>
                      </div>

                      <div className="flex gap-4 items-center">
                        <img src={selectedMenu.gambar || selectedMenu.img} alt={selectedMenu.nama || selectedMenu.name} className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white" />
                        <button 
                          onClick={() => removeCalculatorItem(idx)}
                          className="text-red-400 hover:text-red-600 transition-colors p-2 bg-white rounded-full shadow-sm border border-gray-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-500 py-8 bg-gray-50 rounded-2xl border border-gray-100 font-medium italic">Belum ada menu yang ditambahkan. Klik tombol + pada Menu Warteg di atas.</div>
              )
            ) : (
              <div className="text-gray-500 py-8 bg-gray-50 rounded-2xl border border-gray-100 font-medium">Memuat data kalkulator dari database...</div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 border-t border-gray-100 pt-8 relative z-10">
            <button 
              onClick={addCalculatorItem}
              className="flex items-center justify-center w-full md:w-auto gap-2 bg-white border-2 border-nutriteg-green-dark text-nutriteg-green-dark px-6 py-3.5 rounded-full font-bold hover:bg-nutriteg-green-light/20 transition-all"
            >
              <Plus className="w-5 h-5" /> Tambah Makanan
            </button>
            <div className="bg-nutriteg-green-dark text-white px-8 py-4 rounded-[2rem] shadow-xl shadow-nutriteg-green-dark/30 w-full md:w-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Harga</span>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold opacity-80 mb-1">Rp</span>
                  <span className="text-3xl md:text-4xl font-black">{Math.round(totalPrice).toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Kalori</span>
                <div className="flex items-end gap-1">
                  <span className="text-3xl md:text-4xl font-black">{Math.round(totalCalories)}</span>
                  <span className="text-xl font-bold opacity-80 mb-1">Kkal</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Location */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-cursive font-bold text-gray-900 mb-4">Lokasi <span className="text-nutriteg-green-dark">Kami</span></h2>
        <p className="text-gray-500 mb-12 font-cursive text-xl md:text-2xl mt-2">Kunjungi gerai pertama NutriTeg dan rasakan pengalaman makan sehat secara langsung.</p>
        <div className="w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6919770744747!2d112.79156707444254!3d-7.275841792730623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10ea2ae883%3A0xbe22c41f60b192f!2sPoliteknik%20Elektronika%20Negeri%20Surabaya%20(PENS)!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Modal Detail Menu */}
      {selectedMenuForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMenuForModal(null)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="relative h-64 shrink-0">
              <img src={selectedMenuForModal.gambar || selectedMenuForModal.img} alt={selectedMenuForModal.nama} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedMenuForModal(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto admin-scroll">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-nutriteg-green-dark bg-nutriteg-green-light/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedMenuForModal.kategori || "Menu"}
                </span>
                <span className="font-bold text-lg text-nutriteg-green-dark">
                  Rp {(selectedMenuForModal.harga || 0).toLocaleString('id-ID')}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-2">{selectedMenuForModal.nama || selectedMenuForModal.name}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{selectedMenuForModal.deskripsi || selectedMenuForModal.desc}</p>
              
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-nutriteg-green-dark" /> Informasi Nilai Gizi <span className="text-xs text-gray-400 font-normal">(per 100g)</span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex flex-col justify-center">
                  <span className="text-xs text-orange-600 font-bold uppercase mb-1">Kalori</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-orange-700 leading-none">{selectedMenuForModal.kalori || 0}</span>
                    <span className="text-sm font-bold text-orange-500">Kkal</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col justify-center">
                  <span className="text-xs text-blue-600 font-bold uppercase mb-1">Protein</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-blue-700 leading-none">{selectedMenuForModal.protein || 0}</span>
                    <span className="text-sm font-bold text-blue-500">g</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 flex flex-col justify-center">
                  <span className="text-xs text-yellow-600 font-bold uppercase mb-1">Karbohidrat</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-yellow-700 leading-none">{selectedMenuForModal.karbohidrat || 0}</span>
                    <span className="text-sm font-bold text-yellow-500">g</span>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex flex-col justify-center">
                  <span className="text-xs text-red-600 font-bold uppercase mb-1">Lemak</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-red-700 leading-none">{selectedMenuForModal.lemak || 0}</span>
                    <span className="text-sm font-bold text-red-500">g</span>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 flex flex-col justify-center col-span-2 shadow-sm">
                  <span className="text-xs text-purple-600 font-bold uppercase mb-1">Gula</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-purple-700 leading-none">{selectedMenuForModal.gula || 0}</span>
                    <span className="text-sm font-bold text-purple-500">g</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => {
                    const originalIdx = menuWarteg.indexOf(selectedMenuForModal);
                    if(originalIdx !== -1) {
                      setCalculatorItems([...calculatorItems, { menuIdx: originalIdx, weight: 100 }]);
                      setSelectedMenuForModal(null);
                      document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-nutriteg-green-dark text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-nutriteg-green-darker transition-colors shadow-lg shadow-nutriteg-green-dark/30 hover:-translate-y-1"
                >
                  <Plus className="w-5 h-5" />
                  Tambah ke Kalkulator
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dev Modal */}
      {showDevModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDevModal(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 p-8 text-center"
          >
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
          </motion.div>
        </div>
      )}

    </div>
  );
}
