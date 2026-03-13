import React, { useState, useEffect } from "react";
import { FaHeart, FaTint, FaThermometerHalf, FaStar, FaWind } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState({
    bloodPressure: "120/80",
    heartRate: 72,
    temperature: 36.7,
    bloodSugar: 95,
    oxygen: 98,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData({
        bloodPressure: `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 15)}`,
        heartRate: 60 + Math.floor(Math.random() * 20),
        temperature: (36 + Math.random() * 1.5).toFixed(1),
        bloodSugar: 80 + Math.floor(Math.random() * 30),
        oxygen: 95 + Math.floor(Math.random() * 3),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: "Qon bosimi", value: healthData.bloodPressure + " mmHg", icon: <FaHeart />, color: "text-red-600", bg: "from-red-200 to-red-400" },
    { label: "Yurak urishi", value: healthData.heartRate + " bpm", icon: <FaTint />, color: "text-pink-600", bg: "from-pink-200 to-pink-400" },
    { label: "Harorat", value: healthData.temperature + " °C", icon: <FaThermometerHalf />, color: "text-orange-600", bg: "from-orange-200 to-orange-400" },
    { label: "Qand darajasi", value: healthData.bloodSugar + " mg/dL", icon: <FaStar />, color: "text-yellow-600", bg: "from-yellow-200 to-yellow-400" },
    { label: "Oksigen darajasi", value: healthData.oxygen + " %", icon: <FaWind />, color: "text-blue-600", bg: "from-blue-200 to-blue-400" },
  ];

  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-8 font-sans">
      <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 text-center">
        Salomatlik <span className="text-purple-600">Dashboard</span>
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className={`relative p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center transition-transform transform hover:-translate-y-2 bg-gradient-to-br ${card.bg}`}>
            <div className="bg-white p-4 rounded-full mb-4 shadow-lg text-3xl flex items-center justify-center">
              {card.icon}
            </div>
            <h2 className={`text-lg font-semibold mb-2 ${card.color}`}>{card.label}</h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
   </>
  );
}