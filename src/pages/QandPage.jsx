import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";

export default function QandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-100 to-pink-50 flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-rose-700 mb-6 flex items-center gap-3"
      >
        <FaHeartbeat /> Qand Nazorati
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-2xl text-center mb-8"
      >
        Bu sahifa orqali kunlik qand darajangizni real vaqt monitoring qilishingiz mumkin. Grafiklar, tarix va shaxsiy tavsiyalar shu yerda ko‘rsatiladi.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl bg-white/50 backdrop-blur-lg p-6 rounded-3xl shadow-xl"
      >
        <h2 className="text-xl font-bold text-rose-700 mb-4">Kunlik Qand Statistikasi</h2>
        <p className="text-gray-700 mb-2">Soatlik o‘lchovlar va tavsiyalar:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>08:00 – 95 mg/dL</li>
          <li>12:00 – 110 mg/dL</li>
          <li>16:00 – 105 mg/dL</li>
          <li>20:00 – 100 mg/dL</li>
        </ul>
      </motion.div>
    </div>
  );
}