import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, FaComments, FaVideo, 
  FaAppleAlt, FaStar, FaSignOutAlt, FaUserCircle 
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("Foydalanuvchi");

  // LocalStorage-dan ism-familiyani o'qib olish
  useEffect(() => {
    const updateName = () => {
      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      if (storedProfile && (storedProfile.firstName || storedProfile.lastName)) {
        // Ism va familiyani birlashtiramiz, agar biri bo'lmasa ikkinchisini chiqaramiz
        setUserName(`${storedProfile.firstName} ${storedProfile.lastName}`.trim());
      }
    };

    updateName();

    // LocalStorage o'zgarganda (masalan, Profile sahifasida) Navbar ham yangilanishi uchun
    window.addEventListener('storage', updateName);
    return () => window.removeEventListener('storage', updateName);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/home", label: "Haqida", icon: <FaHome /> },
    { to: "/chatbot", label: "ChatBot", icon: <FaComments /> },
    { to: "/video", label: "Video", icon: <FaVideo /> },
    { to: "/products", label: "Mahsulotlar", icon: <FaAppleAlt /> },
    { to: "/premium", label: "Premium", icon: <FaStar />, isPremium: true },
  ];

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-4 md:px-10 flex items-center justify-between">
      
      {/* Logo qismi */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <FaAppleAlt />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-800">DiaCare</span>
      </Link>

      {/* Markaziy Linklar */}
      <div className="hidden lg:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive(link.to)
                ? "bg-white text-purple-600 shadow-sm"
                : "text-slate-500 hover:text-purple-600 hover:bg-white/50"
            }`}
          >
            <span className={link.isPremium ? "text-amber-500" : ""}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>

      {/* O'ng tomon: Profil va Chiqish */}
      <div className="flex items-center gap-4">
        
        {/* Profil qismi */}
        <Link 
          to="/profile" 
          className="flex items-center gap-3 p-1 pr-3 bg-slate-50 hover:bg-purple-50 rounded-full border border-slate-100 transition group"
        >
          {/* Avatar rasm bo'lsa rasmni, bo'lmasa iconni chiqaramiz */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white border-2 border-white shadow-sm group-hover:scale-105 transition overflow-hidden">
            {/* LocalStorage'da rasm bo'lsa shuni chiqaramiz */}
            {JSON.parse(localStorage.getItem("profile"))?.avatar ? (
              <img 
                src={JSON.parse(localStorage.getItem("profile")).avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle size={24} />
            )}
          </div>
          <div className="hidden sm:block text-left leading-none">
            {/* DINAMIK ISM BU YERDA */}
            <p className="text-[13px] font-black text-slate-700 truncate max-w-[100px]">
              {userName}
            </p>
            <span className="text-[10px] text-purple-500 font-bold uppercase tracking-tighter">
              Online
            </span>
          </div>
        </Link>

        {/* Chiqish tugmasi */}
        <Link
          to="/"
          className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100 group"
          title="Chiqish"
          onClick={() => {
            // Chiqishda xohlasangiz ma'lumotlarni o'chirishingiz mumkin
            // localStorage.removeItem("profile"); 
          }}
        >
          <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;