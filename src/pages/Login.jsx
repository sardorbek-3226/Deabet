// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔥 Keyinchalik backend API bilan almashtiriladi
    setTimeout(() => {
      localStorage.setItem("token", "loggedin");
      navigate("/dashboard"); // yoki landing page
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-orange-400 to-pink-600 flex items-center justify-center px-4">
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/40">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-tr from-orange-500 to-pink-500 w-20 h-20 rounded-3xl rotate-6 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200">
            <ArrowRight className="text-white w-10 h-10 -rotate-6" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Kirish</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="group text-left">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1 tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none font-medium placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="group text-left">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1 tracking-widest">Parol</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-100 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none font-medium"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-600 transition-colors p-0.5"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:shadow-orange-300 hover:shadow-2xl text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-80 shadow-lg shadow-pink-100 uppercase tracking-widest mt-4"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Kirish
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-500 mt-8 text-sm font-bold uppercase tracking-tighter">
          Hisobingiz yo‘qmi?{" "}
          <span 
            className="text-pink-600 cursor-pointer hover:text-orange-500 underline transition-colors"
            onClick={() => navigate("/register")}
          >
            Ro‘yxatdan o‘tish
          </span>
        </p>

      </div>
    </div>
  );
}