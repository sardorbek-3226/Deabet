import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Syringe,
  CalendarDays,
  Timer,
  Apple,
  HeartPulse,
  ChevronRight,
  Users,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { title: "Qand Nazorati", desc: "Real vaqt monitoring", icon: <Activity /> },
    { title: "Insulin Rejasi", desc: "Avtomatik hisob-kitob", icon: <Syringe /> },
    { title: "Ovqat Jadvali", desc: "NB tizimi integratsiya", icon: <CalendarDays /> },
    { title: "Kunlik Tartib", desc: "Reminder va ogohlantirish", icon: <Timer /> },
    { title: "Sog‘lom Ovqat", desc: "AI tavsiyalar", icon: <Apple /> },
    { title: "Sog‘liq Hisoboti", desc: "Grafik va statistika", icon: <HeartPulse /> },
  ];

  const highlights = [
    { 
      title: "Malakali Shifokorlar", 
      desc: "Saytimiz shifokorlar bilan hamkorlikda ishlab chiqilgan va ularning tavsiyalariga asoslanadi.", 
      icon: <Users className="text-purple-600" /> 
    },
    { 
      title: "AI Tavsiyalar", 
      desc: "Sog‘liq va ovqatlanish bo‘yicha aqlli maslahatlar, individual ehtiyojlaringizga mos.", 
      icon: <ShieldCheck className="text-pink-500" /> 
    },
    { 
      title: "Sog‘liq Monitoring", 
      desc: "Foydalanuvchi har kuni o‘z holatini kuzatib, statistikalar orqali oson boshqaradi.", 
      icon: <Sparkles className="text-orange-500" /> 
    },
  ];

  const yourJourney = [
    { title: "Qand Nazorati", desc: "Har kuni real vaqt monitoring va tavsiyalar", icon: <Activity /> },
    { title: "Insulin Rejasi", desc: "Shifokor tavsiyalariga asoslangan dozalash", icon: <Syringe /> },
    { title: "Ovqatlanish", desc: "AI va dietolog tavsiyalari bilan sog‘lom ovqatlanish", icon: <Apple /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex flex-col">

      {/* BACKGROUND BLURS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-300 rounded-full blur-3xl opacity-30 -z-10"></div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex-1 flex flex-col justify-center lg:grid lg:grid-cols-2 lg:items-center gap-12 z-10">
        <div className="flex flex-col justify-center max-w-lg mx-auto lg:mx-0">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-pink-500" />
            <span className="uppercase text-sm font-bold text-gray-500">
              Zamonaviy Diabet Monitoring
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
            DiaCare — Sog‘lig‘ingiz nazorat ostida
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-lg">
            Qon shakarini kuzating, insulin rejangizni boshqaring va
            sog‘lom hayot tarzini oson yo‘lga qo‘ying.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
          <div className="flex flex-wrap gap-8">
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

        {/* YOUR JOURNEY CARD */}
        <div className="bg-white/70 backdrop-blur-lg rounded-[3rem] p-10 shadow-2xl border border-white">
          <h3 className="text-xl font-black mb-6 text-gray-700">
            Sizning sog‘lom hayot yo‘lingiz
          </h3>

          <div className="grid gap-4">
            {yourJourney.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 p-4 bg-white/30 rounded-xl min-h-[60px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-pink-500 text-white rounded-full flex items-center justify-center">
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                  <span className="font-medium text-gray-600">{item.title}</span>
                </div>
                <span className="font-bold text-purple-700 text-sm max-w-xs">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHT SECTION */}
    {/* HIGHLIGHTS + FEATURES COMBINED GRID */}
<section className="max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr z-10">
  {[...highlights, ...features].map((item, index) => (
    <div
      key={index}
      className="group bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
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

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-400 text-sm z-10">
        © 2026 DiaNova — Barcha huquqlar himoyalangan
      </footer>
    </div>
  );
}