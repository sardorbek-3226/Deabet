import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaComments, FaAppleAlt, FaStar, FaSignOutAlt,
  FaUserCircle, FaUserMd, FaBars, FaTimes, FaHeartbeat,
  FaExclamationTriangle, FaBell, FaCog, FaCheckDouble
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // States
  const [userData, setUserData] = useState({ firstName: "Foydalanuvchi", lastName: "", avatar: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Bildirishnomalar uchun namunaviy ma'lumotlar
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Dori ichish vaqti bo'ldi!", time: "5 daqiqa avval", read: false },
    { id: 2, text: "Shifokor sizga javob yozdi.", time: "1 soat avval", read: false },
    { id: 3, text: "Yangi premium chegirma!", time: "2 soat avval", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // 1. Scroll effektini kuzatish
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. LocalStorage dan profilni yuklash
  useEffect(() => {
    const updateProfile = () => {
      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      if (storedProfile) {
        setUserData({
          firstName: storedProfile.firstName || "Foydalanuvchi",
          lastName: storedProfile.lastName || "",
          avatar: storedProfile.avatar || ""
        });
      }
    };
    updateProfile();
    window.addEventListener("storage", updateProfile);
    return () => window.removeEventListener("storage", updateProfile);
  }, []);

  // 3. Funksiyalar
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/");
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotifOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/home", label: "Haqida", icon: <FaHome /> },
    { to: "/chatbot", label: "ChatBot", icon: <FaComments /> },
    { to: "/products", label: "Mahsulotlar", icon: <FaAppleAlt /> },
    { to: "/premium", label: "Premium", icon: <FaStar />, isPremium: true },
    { to: "/doctorconsultation", label: "Konsultatsiya", icon: <FaUserMd />, isPremium: true },
    { to: "/salomatlik", label: "Salomatlik", icon: <FaHeartbeat />, isPremium: true },
    { to: "/favqulot", label: "Favqulodda", icon: <FaExclamationTriangle />, isUrgent: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-10 flex items-center justify-between h-20 ${
      scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200" : "bg-white border-b border-slate-100"
    }`}>
      
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <FaAppleAlt />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-800">DiaCare</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all group ${
              isActive(link.to) ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-purple-600 hover:bg-white/50"
            }`}
          >
            <span className={`${link.isPremium ? "text-amber-500" : link.isUrgent ? "text-rose-500 animate-pulse" : ""}`}>
              {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Tools (Notifications + Profile) */}
      <div className="flex items-center gap-3">
        
        {/* Notification Dropdown Component */}
        <div className="relative">
          <button 
            onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}
            className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition"
          >
            <FaBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-sm">Bildirishnomalar</h3>
                  <button onClick={clearAllNotifications} className="text-[10px] text-rose-500 font-bold hover:underline">Tozalash</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => markAsRead(n.id)}
                        className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${!n.read ? "bg-indigo-50/50 hover:bg-indigo-50" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? "bg-indigo-500" : "bg-transparent"}`}></div>
                          <div>
                            <p className={`text-[13px] ${!n.read ? "font-bold text-slate-800" : "text-slate-600"}`}>{n.text}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-slate-400 text-sm italic">Xabarlar mavjud emas</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/profile" className="flex items-center gap-3 p-1 pr-4 bg-slate-50 hover:bg-purple-50 rounded-full border border-slate-100 transition group">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm overflow-hidden">
              {userData.avatar ? <img src={userData.avatar} alt="User" className="w-full h-full object-cover" /> : userData.firstName.charAt(0)}
            </div>
            <div className="text-left leading-none">
              <p className="text-[13px] font-black text-slate-700">{userData.firstName}</p>
              <span className="text-[10px] text-emerald-500 font-bold uppercase">Online</span>
            </div>
          </Link>
          <button onClick={handleLogout} className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm group">
            <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }} className="lg:hidden p-2 text-slate-700 hover:text-purple-600 transition">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-2xl border-t border-slate-100 lg:hidden flex flex-col z-40 animate-in slide-in-from-top-2">
          <div className="p-4 bg-slate-50 flex items-center gap-4 border-b border-slate-100">
             <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                {userData.avatar ? <img src={userData.avatar} alt="User" className="w-full h-full object-cover" /> : userData.firstName.charAt(0)}
             </div>
             <div>
                <p className="font-bold text-slate-800">{userData.firstName} {userData.lastName}</p>
                <p className="text-xs text-slate-500">Profil sozlamalari</p>
             </div>
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 text-base font-bold border-b border-slate-50 ${
                  isActive(link.to) ? "bg-purple-50 text-purple-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className={link.isPremium ? "text-amber-500" : link.isUrgent ? "text-rose-500" : ""}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="p-4 flex gap-2">
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 rounded-xl font-bold text-slate-700"><FaCog /> Profil</Link>
            <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 p-3 bg-rose-50 text-rose-600 rounded-xl font-bold"><FaSignOutAlt /> Chiqish</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;