"use client";

import { motion } from "framer-motion";
import { History, Target, BookOpen, HeartPulse } from "lucide-react";

export default function TentangPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-warteg-bg dark:bg-warteg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-warteg-text dark:text-warteg-dark-text mb-6"
          >
            Tentang <span className="text-nutriteg-green-dark">NutriTeg</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Menggabungkan kearifan lokal warung tradisional dengan teknologi modern untuk gaya hidup yang lebih sehat.
          </motion.p>
        </div>

        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-16 shadow-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80" 
            alt="Warteg Tradisional" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
            <h2 className="text-white text-2xl md:text-3xl font-bold">Dari Jalanan Menuju Masa Depan</h2>
          </div>
        </motion.div>

        <div className="space-y-16">
          
          {/* Section 1: Sejarah */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="bg-nutriteg-green-dark/10 p-4 rounded-2xl flex-shrink-0">
              <History className="w-8 h-8 text-nutriteg-green-dark" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-warteg-text dark:text-warteg-dark-text">Sejarah Warteg</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Warung Tegal (Warteg) telah lama menjadi pahlawan perut masyarakat Indonesia. Berawal dari masyarakat Tegal yang merantau ke kota-kota besar sejak tahun 1950-an, mereka mendirikan warung makan sederhana untuk para pekerja. Kini, warteg bukan sekadar tempat makan murah, melainkan identitas kuliner Nusantara yang menyatukan berbagai kalangan.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Tujuan */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl flex-shrink-0">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-warteg-text dark:text-warteg-dark-text">Tujuan Kami</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                NutriTeg hadir untuk menghapus stigma bahwa makanan warteg kurang sehat. Kami bertujuan untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-2">
                <li>Melestarikan budaya makan di warteg.</li>
                <li>Memberikan transparansi nilai gizi setiap hidangan.</li>
                <li>Membantu masyarakat merencanakan pola makan sehat dengan harga terjangkau.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 3: Edukasi */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl flex-shrink-0">
              <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-warteg-text dark:text-warteg-dark-text">Pentingnya Menjaga Gizi</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kenyang saja tidak cukup. Tubuh membutuhkan keseimbangan makronutrisi (karbohidrat, protein, lemak) dan mikronutrisi (vitamin, mineral). Terlalu banyak karbohidrat dan lemak jenuh dapat memicu penyakit kronis. Dengan mengerti apa yang kita makan, kita bisa mencegah berbagai masalah kesehatan di masa depan.
              </p>
            </div>
          </motion.section>

          {/* Section 4: Manfaat Kalkulator */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 items-start bg-white dark:bg-warteg-dark-card p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-2xl flex-shrink-0">
              <HeartPulse className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-warteg-text dark:text-warteg-dark-text">Manfaat Mengetahui Kalori</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <h4 className="font-semibold mb-2">Kontrol Berat Badan</h4>
                  <p className="text-sm text-gray-500">Memastikan kalori yang masuk sesuai dengan kebutuhan harian, menghindari defisit berlebih atau surplus.</p>
                </div>
                <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <h4 className="font-semibold mb-2">Makan Lebih Sadar (Mindful)</h4>
                  <p className="text-sm text-gray-500">Membantu kita berhenti sebelum kenyang berlebihan dan menghargai setiap suapan.</p>
                </div>
                <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <h4 className="font-semibold mb-2">Energi Optimal</h4>
                  <p className="text-sm text-gray-500">Kombinasi nutrisi yang tepat membuat tubuh tidak mudah lemas atau mengantuk setelah makan.</p>
                </div>
                <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <h4 className="font-semibold mb-2">Bebas Rasa Bersalah</h4>
                  <p className="text-sm text-gray-500">Tetap bisa makan gorengan atau yang manis-manis asalkan masih dalam batas kalori harian.</p>
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
