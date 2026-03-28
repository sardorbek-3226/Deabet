import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaHeartbeat, FaAppleAlt, FaClipboardList, FaStar, FaDumbbell, FaClock, FaUserMd 
} from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { title: "Qand Nazorati", description: "Kunlik qand darajangizni monitoring qiling.", icon: <FaHeartbeat />, color: "from-rose-400 to-red-500", route: "/qand" },
    { title: "Ovqat Rejasi", description: "AI yordamida shakllantirilgan shaxsiy parhez.", icon: <FaAppleAlt />, color: "from-amber-400 to-orange-500", route: "/ovqat" },
    { title: "Statistika", description: "Haftalik va oylik grafiklarni tahlil qiling.", icon: <FaClipboardList />, color: "from-blue-400 to-indigo-600", route: "/insulin" },
    { title: "Premium Tavsiyalar", description: "Eksklyuziv diet va hayot tarzi tavsiyalari.", icon: <FaStar />, color: "from-yellow-400 to-amber-600", route: "/premium" },
    { title: "Jismoniy Faoliyat", description: "Har kuni moslashtirilgan mashqlarni bajaring.", icon: <FaDumbbell />, color: "from-emerald-400 to-teal-600", route: "/fitness" },
    { title: "Kunlik Rutina", description: "Eslatmalar bilan tartibli hayot kechiring.", icon: <FaClock />, color: "from-violet-400 to-purple-600", route: "/test" },
  ];

  const tips = [
    "Kam shakarli ovqatlar tanlang.",
    "20 daqiqa piyoda yuring.",
    "Suv balansini saqlang.",
    "Uyqu va dam olishga e'tibor bering."
  ];



  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-purple-200">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-100/50 blur-[120px] rounded-full -z-10"></div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600"
        >
          DiaCare <span className="text-purple-600">Sog'lig'ingizni qo'lingizda</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
          DiaCare — bu sizning shaxsiy diabet monitoring va sog'lom turmush tarzini qo‘llab-quvvatlaydigan platformangiz.  
          Qand nazorati, ovqat rejalari va maslahatlar bilan har kuni sog'lom turmushni boshqaring.
        </p>
      </header>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 -mt-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Platforma imkoniyatlari</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Link to={f.route} key={i} className="group">
            <div className={`bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-2xl shadow-lg mb-6 group-hover:rotate-12 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          </Link>
        ))}
      </div>
      </section>



      {/* Diabetes Info Section */}
      <section id="diabetes" className="max-w-5xl mx-auto my-24 px-6">
        <div className="relative overflow-hidden bg-purple-600 rounded-[40px] p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <FaUserMd /> Diabet kasalligi haqida
          </h2>
          <p className="mb-6 text-lg text-center">
            Diabet — bu qon shakar darajasining yuqori yoki past bo‘lishi bilan bog‘liq surunkali kasallik. 
            Ushbu platforma sizga kundalik qand monitoringi, ovqat va jismoniy faoliyat tavsiyalari bilan yordam beradi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.03 }} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex-shrink-0 flex items-center justify-center text-slate-900 font-bold">!</div>
                <p className="font-medium text-lg">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 text-center text-slate-400">
        <div className="flex justify-center gap-8 mb-6 text-slate-600 font-medium">
          <a href="#">Xavfsizlik</a>
          <a href="#">Yordam</a>
          <a href="#">Aloqa</a>
        </div>
        <p>© 2026 DiaCare. Hamma narsa siz uchun yaratildi.</p>
      </footer>
    </div>
  );
}