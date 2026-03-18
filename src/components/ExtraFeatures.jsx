import React from "react";
import { BarChart2, Star, Heart } from "lucide-react";

export default function ExtraFeatures() {
  const extraFeatures = [
    { title: "Progress Tracking", desc: "Haftalik va oylik statistikalar", icon: <BarChart2 /> },
    { title: "Favourite Meals", desc: "Sevimli ovqatlaringizni tez qo‘shish", icon: <Star /> },
    { title: "Health Insights", desc: "AI tahlil orqali maslahatlar", icon: <Heart /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-black text-purple-700 mb-8 text-center animate-fade-in-delay">
        Qo‘shimcha Funksiyalar
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {extraFeatures.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-gradient-to-tr from-purple-400 to-pink-400 text-white rounded-3xl shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in-delay flex flex-col items-start gap-4"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}