import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ChevronRight,
  Users,
  ShieldCheck,
  Activity,
  Syringe,
  CalendarDays,
  Timer,
  Apple,
  HeartPulse,
  BarChart2,
  Star,
  Heart
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

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

  const extraFeatures = [
    { title: "Progress Tracking", desc: "Haftalik va oylik statistikalar", icon: <BarChart2 /> },
    { title: "Favourite Meals", desc: "Sevimli ovqatlaringizni tez qo‘shish", icon: <Star /> },
    { title: "Health Insights", desc: "AI tahlil orqali maslahatlar", icon: <Heart /> },
  ];

  const yourJourney = [
    { title: "Qand Nazorati", desc: "Har kuni real vaqt monitoring va tavsiyalar", icon: <Activity /> },
    { title: "Insulin Rejasi", desc: "Shifokor tavsiyalariga asoslangan dozalash", icon: <Syringe /> },
    { title: "Ovqatlanish", desc: "AI va dietolog tavsiyalari bilan sog‘lom ovqatlanish", icon: <Apple /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">

      {/* Background Blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12 items-center">
        {/* LEFT HERO */}
        <div className="flex-1 flex flex-col gap-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="text-pink-500 animate-pulse-slow" />
            <span className="uppercase text-sm font-bold text-gray-500">Zamonaviy Diabet Monitoring</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-gradient-text">
            DiaCare — Sog‘lig‘ingiz nazorat ostida
          </h1>

          <p className="text-gray-600 text-base md:text-lg">
            Qon shakarini kuzating, insulin rejangizni boshqaring va sog‘lom hayot tarzini oson yo‘lga qo‘ying.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              Boshlash
              <ChevronRight className="group-hover:translate-x-1 transition"/>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-purple-300 text-purple-600 font-bold rounded-2xl hover:bg-white transition-all"
            >
              Kirish
            </button>
          </div>
        </div>

        {/* RIGHT HERO CARD */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white animate-fade-in-delay">
          <h3 className="text-xl font-black mb-6 text-gray-700">Sizning sog‘lom hayot yo‘lingiz</h3>
          <div className="grid gap-4">
            {yourJourney.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/30 rounded-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-pink-500 text-white rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-600">{item.title}</span>
                </div>
                <span className="font-bold text-purple-700 text-sm max-w-xs">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS + FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...highlights, ...features].map((item, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-md flex flex-col items-start gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${
              index < highlights.length ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white" : "bg-gradient-to-tr from-orange-400 to-pink-500 text-white"
            }`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* EXTRA FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black text-purple-700 mb-8 text-center">Qo‘shimcha Funksiyalar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {extraFeatures.map((item, i) => (
            <div key={i} className="p-6 bg-gradient-to-tr from-purple-400 to-pink-400 text-white rounded-3xl shadow-xl flex flex-col gap-4 hover:scale-105 transition-all duration-500">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-10 rounded-3xl text-white shadow-2xl hover:scale-105 transition-all duration-500">
          <h2 className="text-3xl font-black mb-4">Sog‘lig‘ingizni nazorat qiling</h2>
          <p className="mb-6">DiaCare bilan sog‘lom hayot boshlang</p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            Boshlash
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-400 text-sm">
        © 2026 DiaNova — Barcha huquqlar himoyalangan
      </footer>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite; }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-text { background-size: 200% 200%; animation: gradient-text 5s ease infinite; }

        @keyframes fade-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease forwards; }
        .animate-fade-in-delay { animation: fade-in 1s ease forwards; animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}