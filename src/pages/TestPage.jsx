import React from "react";
import { motion } from "framer-motion";
import { FaFlask } from "react-icons/fa";

export default function TestPage() {
  const tests = [
    { name: "Fasting Glucose", value: "95 mg/dL", status: "Normal" },
    { name: "Postprandial", value: "120 mg/dL", status: "Normal" },
    { name: "HbA1c", value: "5.6%", status: "Normal" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 flex flex-col items-center p-6">
      <motion.h1 className="text-4xl md:text-5xl font-black text-green-700 mb-6 flex items-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <FaFlask /> Qand Testlari
      </motion.h1>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Bu yerda sizning oxirgi laboratoriya natijalaringiz ko‘rsatiladi va har bir test bo‘yicha izohlar mavjud.
      </p>
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
        {tests.map((t, i) => (
          <motion.div 
            key={i} 
            className="p-6 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-bold text-lg mb-2">{t.name}</h2>
            <p className="text-gray-700 mb-1">{t.value}</p>
            <span className={`px-3 py-1 rounded-full text-sm ${t.status === "Normal" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{t.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}