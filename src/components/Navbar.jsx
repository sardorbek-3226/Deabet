import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaVideo,
  FaAppleAlt,
  FaStar,
  FaSignOutAlt,
  FaUserCircle,
  FaUserMd,
  FaBars,
  FaTimes,
  FaHeartbeat,
  FaExclamationTriangle,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("Foydalanuvchi");
  const [menuOpen, setMenuOpen] = useState(false);

  // LocalStorage-dan ism-familiyani o'qib olish
  useEffect(() => {
    const updateName = () => {
      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      if (
        storedProfile &&
        (storedProfile.firstName || storedProfile.lastName)
      ) {
        setUserName(
          `${storedProfile.firstName} ${storedProfile.lastName}`.trim()
        );
      }
    };

    updateName();

    window.addEventListener("storage", updateName);
    return () => window.removeEventListener("storage", updateName);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/home", label: "Haqida", icon: <FaHome /> },
    { to: "/chatbot", label: "ChatBot", icon: <FaComments /> },
    { to: "/products", label: "Mahsulotlar", icon: <FaAppleAlt /> },
    { to: "/premium", label: "Premium", icon: <FaStar />, isPremium: true },
    {
      to: "/doctorconsultation",
      label: "Consultation",
      icon: <FaUserMd />,
      isPremium: true,
      tooltip: "Demo available – full access with subscription",
    },
    {
      to: "/salomatlik",
      label: "Salomatlik",
      icon: <FaHeartbeat />,
      isPremium: true,
      tooltip: "Foydalanuvchi salomatligi haqidagi real-time ma’lumotlar",
    },
    { label: "Favqulodda", to: "/favqulot", icon: <FaExclamationTriangle /> },
  ];

  return (
    <nav className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-4 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <FaAppleAlt />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-800">
          DiaCare
        </span>
      </Link>

      {/* Desktop Menu */}
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
            <span className={link.isPremium ? "text-amber-500" : ""}>
              {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Hamburger / Mobile Menu */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-slate-700 hover:text-purple-600 transition"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Profile + Logout */}
      <div className="hidden lg:flex items-center gap-4">
        <Link
          to="/profile"
          className="flex items-center gap-3 p-1 pr-3 bg-slate-50 hover:bg-purple-50 rounded-full border border-slate-100 transition group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white border-2 border-white shadow-sm group-hover:scale-105 transition overflow-hidden">
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
          <div className="text-left leading-none">
            <p className="text-[13px] font-black text-slate-700 truncate max-w-[100px]">
              {userName}
            </p>
            <span className="text-[10px] text-purple-500 font-bold uppercase tracking-tighter">
              Online
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100 group"
          title="Chiqish"
        >
          <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Mobile Dropdown (navlinks + profile + logout) */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg border-t border-slate-100 lg:hidden flex flex-col z-40">
          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 text-base font-bold transition-all ${
                isActive(link.to)
                  ? "bg-purple-50 text-purple-600"
                  : "text-slate-600 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <span className={link.isPremium ? "text-amber-500" : ""}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}

          <div className="border-t border-slate-100 mt-1 pt-2 flex flex-col gap-2 px-6 pb-4">
            {/* Mobile Profile */}
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-2 bg-slate-50 hover:bg-purple-50 rounded-full border border-slate-100 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white border-2 border-white shadow-sm overflow-hidden">
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
              <div className="text-left leading-none">
                <p className="text-[13px] font-black text-slate-700 truncate max-w-[100px]">
                  {userName}
                </p>
                <span className="text-[10px] text-purple-500 font-bold uppercase tracking-tighter">
                  Online
                </span>
              </div>
            </Link>

            {/* Mobile Logout */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100 mt-1"
              title="Chiqish"
            >
              <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;