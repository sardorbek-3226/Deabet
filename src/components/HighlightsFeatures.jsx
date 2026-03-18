import React from "react";
import { Users, ShieldCheck, Sparkles, Activity, Syringe, CalendarDays, Timer, Apple, HeartPulse } from "lucide-react";

export default function HighlightsFeatures() {
  const highlights = [
    { title: "Malakali Shifokorlar", desc: "Shifokorlar bilan hamkorlikda ishlab chiqilgan", icon: <Users /> },
    { title: "AI Tavsiyalar", desc: "Individual ehtiyojlaringizga mos aqlli maslahatlar", icon: <ShieldCheck /> },
    { title: "Sog‘liq Monitoring", desc: "Foydalanuvchi har kuni holatini kuzatadi", icon: <Sparkles /> },
  ];

  const features = [
    { title: "Qand Nazorati", desc: "Real vaqt monitoring", icon: <Activity /> },
    { title: "Insulin Rejasi", desc: "Avtomatik hisob-kitob", icon: <Syringe /> },
    { title: "Ovqat Jadvali", desc: "AI tizimi integratsiya", icon: <CalendarDays /> },
    { title: "Kunlik Tartib", desc: "Reminder va ogohlantirish", icon: <Timer /> },
    { title: "Sog‘lom Ovqat", desc: "AI tavsiyalar", icon: <Apple /> },
    { title: "Sog‘liq Hisoboti", desc: "Grafik va statistika", icon: <HeartPulse /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {[...highlights, ...features].map((item, index) => (
        <div
          key={index}
          className="group bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full animate-fade-in-delay"
        >
          {/* Icon */}
          <div className={`w-14 h-14 flex items-center justify-center mb-4 rounded-2xl ${
            index < highlights.length 
              ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white"
              : "bg-gradient-to-tr from-orange-400 to-pink-500 text-white"
          }`}>
            {React.cloneElement(item.icon, { size: 28 })}
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}