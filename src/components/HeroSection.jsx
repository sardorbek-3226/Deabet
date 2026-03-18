import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 overflow-hidden">
      
      {/* BACKGROUND BLURS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* HERO CONTENT */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 z-10">

        {/* LEFT SIDE */}
        <div className="flex flex-col max-w-lg space-y-6">
          <div className="flex items-center gap-2 animate-fade-in-delay">
            <Sparkles className="text-pink-500" />
            <span className="uppercase text-sm font-bold text-gray-500">Zamonaviy Diabet Monitoring</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-gradient-text">
            DiaCare — Sog‘lig‘ingiz nazorat ostida
          </h1>

          <p className="text-gray-600 text-base md:text-lg animate-fade-in-delay">
            Qon shakarini kuzating, insulin rejangizni boshqaring va sog‘lom hayot tarzini oson yo‘lga qo‘ying.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in-delay">
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              Boshlash
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-purple-300 text-purple-600 font-bold rounded-2xl hover:bg-white transition-all"
            >
              Kirish
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-8 mt-10 animate-fade-in-delay">
            <div>
              <p className="text-2xl md:text-3xl font-black text-purple-700">1,200+</p>
              <p className="text-gray-500 text-sm">Foydalanuvchi</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-pink-600">98%</p>
              <p className="text-gray-500 text-sm">Qoniqish</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-orange-500">24/7</p>
              <p className="text-gray-500 text-sm">Monitoring</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white animate-fade-in-delay">
          <h3 className="text-xl font-black mb-6 text-gray-700">Sizning sog‘lom hayot yo‘lingiz</h3>
          <div className="grid gap-4">
            {[
              { title: "Qand Nazorati", desc: "Har kuni monitoring", icon: "🍬" },
              { title: "Insulin Rejasi", desc: "Shifokor tavsiyalariga asoslangan", icon: "💉" },
              { title: "Ovqatlanish", desc: "AI tavsiyalari bilan sog‘lom", icon: "🍏" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 p-4 bg-white/30 rounded-xl min-h-[60px] hover:shadow-lg transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-pink-500 text-white rounded-full flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-600">{item.title}</span>
                </div>
                <span className="font-bold text-purple-700 text-sm max-w-xs">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}