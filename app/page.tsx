"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, MapPin, Plus, Trash2 } from "lucide-react";

const paketSehat = [
  { name: "Paket Tinggi Protein", desc: "Dada ayam bakar, telur rebus, brokoli rebus, tempe panggang. Total kalori 450 Kkal. Cocok untuk pembentukan otot.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
  { name: "Paket Diet Sehat", desc: "Ayam dada bakar, beras merah, selada, tomat, timun, edamame. Total kalori 350 Kkal. Menurunkan berat badan.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { name: "Paket Gizi Seimbang", desc: "Nasi putih 1 porsi, ayam panggang, tahu, tempe, sayur bayam rebus. Total kalori 500 Kkal. Menjaga keseimbangan tubuh.", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80" },
  { name: "Paket Tinggi Karbohidrat", desc: "Nasi porsi besar, mie goreng, ayam goreng, kentang goreng. Total kalori 800 Kkal. Sumber energi cepat.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80" },
];

const menuWarteg = [
  { name: "Tempe Orek Kering", desc: "Potongan tempe yang dimasak kering dengan bumbu kecap manis, sedikit pedas, dan gurih.", kcal: "150 Kkal", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80" },
  { name: "Ikan Nila Bakar Pedas", desc: "Ikan Nila bakar dengan bumbu kecap manis pedas, disajikan dengan sambal terasi.", kcal: "250 Kkal", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&q=80" },
  { name: "Ayam Goreng Rempah Bali", desc: "Ayam goreng dengan bumbu rempah khas Bali, rasanya gurih, sedikit pedas, dan harum.", kcal: "350 Kkal", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&q=80" },
  { name: "Tahu Bakso Panggang", desc: "Tahu diisi adonan daging sapi cincang, dipanggang dengan saus BBQ madu.", kcal: "200 Kkal", img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=300&q=80" },
  { name: "Tumis Kangkung Bawang Putih", desc: "Kangkung segar ditumis cepat dengan bawang putih dan saus tiram, renyah dan gurih.", kcal: "80 Kkal", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80" },
  { name: "Nasi Merah Porsi Pas", desc: "Nasi merah organik yang dikukus pulen, kaya serat dan baik untuk pencernaan.", kcal: "110 Kkal", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80" },
  { name: "Sayur Sop Kuah Bening", desc: "Potongan wortel, kentang, kubis, dan bakso sapi dalam kuah kaldu sapi bening.", kcal: "120 Kkal", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80" },
  { name: "Telur Dadar Bumbu Minyak", desc: "Telur kocok digoreng dengan bumbu dasar kuning dan daun bawang segar.", kcal: "180 Kkal", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80" },
  { name: "Jus Alpukat Murni", desc: "Jus alpukat tanpa gula tambahan, kental dan creamy, kaya lemak baik.", kcal: "160 Kkal", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&q=80" },
  { name: "Es Jeruk Manis Asli", desc: "Perasan jeruk manis murni dengan sedikit es batu, menyegarkan dan kaya vitamin C.", kcal: "90 Kkal", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80" },
  { name: "Whey Protein 1 Scoop", desc: "Suplemen protein whey isolate rasa coklat, cepat diserap otot setelah latihan.", kcal: "120 Kkal", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&q=80" },
  { name: "Pisang Mulus (Smoothie)", desc: "Pisang Cavendish matang di-blend halus dengan susu rendah lemak.", kcal: "150 Kkal", img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=300&q=80" },
];

export default function Home() {
  const [calculatorItems, setCalculatorItems] = useState([
    { menuIdx: 0, weight: 100 }
  ]);

  const addCalculatorItem = () => {
    setCalculatorItems([...calculatorItems, { menuIdx: 0, weight: 100 }]);
  };

  const removeCalculatorItem = (index: number) => {
    if (calculatorItems.length > 1) {
      setCalculatorItems(calculatorItems.filter((_, idx) => idx !== index));
    }
  };

  const updateCalculatorItem = (index: number, field: string, value: number) => {
    const newItems = [...calculatorItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setCalculatorItems(newItems);
  };

  const totalCalories = calculatorItems.reduce((total, item) => {
    const menu = menuWarteg[item.menuIdx];
    const kaloriPer100g = parseInt(menu.kcal);
    return total + (kaloriPer100g * item.weight) / 100;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nutriteg-green-dark mb-6 leading-tight">
              Sadar hidup sehat hari ini, sebelum sehat menjadi hal yang mustahil dicari.
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg text-sm leading-relaxed">
              Pola makan sehat bukan berarti makanan hambar dan tak nikmat. Di NutriTeg, kami meracik cita rasa otentik warteg dengan sentuhan sehat dan penuh nutrisi. Kami menghadirkan makanan yang tak hanya nikmat, tapi juga terukur nilai gizinya agar kamu tak perlu lagi khawatir dengan makanan yang disantap.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-nutriteg-green-dark text-nutriteg-green-dark font-semibold hover:bg-nutriteg-green-dark hover:text-white transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
              Order In
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" 
              alt="Salad sehat" 
              className="w-full max-w-md rounded-full object-cover aspect-square shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Kenapa Memilih NutriTeg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" alt="Tempe" className="w-full h-40 object-cover rounded-xl" />
            <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80" alt="Dada Ayam" className="w-full h-64 object-cover rounded-xl row-span-2" />
            <img src="https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=400&q=80" alt="Daging" className="w-full h-40 object-cover rounded-xl" />
          </div>
          <div className="pl-0 lg:pl-10">
            <h2 className="text-3xl font-bold text-nutriteg-green-dark mb-4">
              Kenapa Memilih NutriTeg?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami menyajikan makanan lezat dengan nutrisi seimbang untuk mendukung gaya hidup sehat Anda. Pilihan menu yang beragam, dihitung kalori dan kandungan makro-nutrisinya, diolah secara higienis, serta menggunakan bahan makanan segar pilihan. Nikmati rasa yang Anda cintai dari warteg tanpa rasa bersalah.
            </p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="w-full bg-nutriteg-green-dark py-16 my-10 relative overflow-hidden flex items-center justify-center min-h-[250px]">
        {/* Placeholder for background veggies image */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black italic text-yellow-400 drop-shadow-md transform -skew-x-6 tracking-wide">
            MAKAN<br/>SEHAT DIMULAI<br/>DARI DIRI SENDIRI
          </h2>
          <div className="absolute top-0 left-10 md:left-20">
             <MapPin className="text-white w-12 h-12" />
          </div>
        </div>
      </section>

      {/* Menu Paket Sehat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-nutriteg-green-dark mb-10">Menu Paket Sehat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paketSehat.map((paket, idx) => (
            <div key={idx} className="flex flex-row items-center bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={paket.img} alt={paket.name} className="w-32 h-32 rounded-full object-cover mr-6 shadow-sm" />
              <div className="text-left flex-1 relative">
                <h3 className="font-bold text-nutriteg-green-dark mb-2">{paket.name}</h3>
                <p className="text-xs text-gray-500 pr-8">{paket.desc}</p>
                <button className="absolute bottom-0 right-0 bg-nutriteg-green-dark text-white p-1 rounded-full hover:bg-nutriteg-green-darker transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Warteg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-nutriteg-green-dark mb-10">Menu Warteg</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuWarteg.map((menu, idx) => (
            <div key={idx} className="bg-nutriteg-green-lighter rounded-2xl p-5 text-left relative flex flex-col hover:-translate-y-1 transition-transform">
              <div className="flex justify-center mb-4">
                 <img src={menu.img} alt={menu.name} className="w-24 h-24 rounded-full object-cover shadow-sm" />
              </div>
              <h3 className="font-bold text-sm text-nutriteg-green-darker mb-2 min-h-[40px]">{menu.name}</h3>
              <p className="text-xs text-nutriteg-green-dark opacity-80 mb-6 flex-1">{menu.desc}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs font-bold text-nutriteg-green-darker">{menu.kcal}</span>
                <button className="bg-nutriteg-green-dark text-white p-1.5 rounded-full hover:bg-nutriteg-green-darker transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kalkulator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-nutriteg-green-dark mb-10">Kalkulator Kalori Makanan</h2>
        <div className="bg-nutriteg-green-light rounded-xl p-8 flex flex-col items-center">
          
          <div className="w-full mb-6 space-y-4">
            {calculatorItems.map((item, idx) => {
              const selectedMenu = menuWarteg[item.menuIdx];
              const kaloriPer100g = parseInt(selectedMenu.kcal);
              const itemKcal = Math.round((kaloriPer100g * item.weight) / 100);

              return (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex-1 w-full md:w-auto">
                    <label className="block text-left text-xs font-bold text-nutriteg-green-dark mb-1">Pilih Menu</label>
                    <select 
                      value={item.menuIdx} 
                      onChange={(e) => updateCalculatorItem(idx, "menuIdx", parseInt(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark"
                    >
                      {menuWarteg.map((menu, mIdx) => (
                        <option key={mIdx} value={mIdx}>{menu.name} ({menu.kcal}/100g)</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-full md:w-32">
                    <label className="block text-left text-xs font-bold text-nutriteg-green-dark mb-1">Berat (gram)</label>
                    <input 
                      type="number" 
                      min="1"
                      value={item.weight} 
                      onChange={(e) => updateCalculatorItem(idx, "weight", parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-nutriteg-green-dark"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center min-w-[80px]">
                     <span className="text-xs text-gray-500">Kalori</span>
                     <span className="font-bold text-nutriteg-green-dark">{itemKcal} Kkal</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <img src={selectedMenu.img} alt={selectedMenu.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                    <button 
                      onClick={() => removeCalculatorItem(idx)}
                      disabled={calculatorItems.length === 1}
                      className="text-red-400 hover:text-red-600 disabled:opacity-30 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 border-t border-white/40 pt-6">
            <button 
              onClick={addCalculatorItem}
              className="flex items-center gap-2 bg-white text-nutriteg-green-dark px-4 py-2 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" /> Tambah Makanan
            </button>
            <div className="bg-nutriteg-green-dark text-white px-8 py-3 rounded-2xl shadow-md">
              <span className="text-sm opacity-80 block mb-1">Total Kalori</span>
              <span className="text-2xl font-black">{Math.round(totalCalories)} Kkal</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* Location */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24 text-center">
        <h2 className="text-2xl font-bold text-nutriteg-green-dark mb-10">Location</h2>
        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border-4 border-nutriteg-green-light">
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

    </div>
  );
}
