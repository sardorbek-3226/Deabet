import React, { useState, useEffect } from "react";
import { Camera, Calendar, User, Weight, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    gender: "",
    avatar: "" // Rasm uchun joy
  });
  const [savedDate, setSavedDate] = useState(null);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedDate = localStorage.getItem("profileSavedDate");
    
    if (storedProfile) {
      setProfile(storedProfile);
      setSavedDate(storedDate);
      
      const now = new Date();
      const saved = new Date(storedDate);
      const diffDays = (now - saved) / (1000 * 60 * 60 * 24);
      
      if (diffDays >= 15) {
        setEditing(true);
      } else {
        setEditing(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!profile.firstName || !profile.lastName) {
      alert("Iltimos, ism va familiyani kiriting!");
      return;
    }
    const now = new Date();
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("profileSavedDate", now.toISOString());
    setSavedDate(now.toISOString());
    setEditing(false);
    alert("Profil muvaffaqiyatli saqlandi!");
  };

  const daysLeft = savedDate
    ? Math.max(0, 15 - Math.floor((new Date() - new Date(savedDate)) / (1000 * 60 * 60 * 24)))
    : 0;

  const progressPercent = ((15 - daysLeft) / 15) * 100;

  return (
      <>
      <Navbar/>
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center font-sans text-slate-800">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* CHAP TOMON: Kiritish Formasi */}
        <div className="p-8 border-r border-slate-50">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Ma'lumotlar</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1">ISM</label>
                <input
                  type="text" name="firstName" value={profile.firstName} onChange={handleChange}
                  placeholder="Ali" disabled={!editing}
                  className="w-full bg-slate-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1">FAMILIYA</label>
                <input
                  type="text" name="lastName" value={profile.lastName} onChange={handleChange}
                  placeholder="Valiyev" disabled={!editing}
                  className="w-full bg-slate-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number" name="age" value={profile.age} onChange={handleChange}
                placeholder="Yosh" disabled={!editing}
                className="w-full bg-slate-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition-all disabled:opacity-50"
              />
              <input
                type="number" name="weight" value={profile.weight} onChange={handleChange}
                placeholder="Vazn (kg)" disabled={!editing}
                className="w-full bg-slate-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition-all disabled:opacity-50"
              />
            </div>

            <select
              name="gender" value={profile.gender} onChange={handleChange} disabled={!editing}
              className="w-full bg-slate-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition-all disabled:opacity-50 cursor-pointer"
            >
              <option value="">Jinsni tanlang</option>
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>

            <button
              onClick={handleSave}
              disabled={!editing}
              className={`w-full py-4 mt-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${
                editing 
                ? "bg-slate-900 text-white hover:bg-purple-700 shadow-purple-200" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Saqlash
            </button>
          </div>
        </div>

        {/* O'NG TOMON: Card Preview */}
        <div className="bg-slate-900 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Bezaklar */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -ml-16 -mb-16"></div>

          <div className="relative group z-10">
            <div className="w-40 h-40 rounded-[2.5rem] border-4 border-slate-800 overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img
                src={profile.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {editing && (
              <label className="absolute -bottom-2 -right-2 bg-purple-600 p-3 rounded-2xl shadow-xl cursor-pointer hover:bg-purple-500 transition-colors border-4 border-slate-900">
                <Camera size={20} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>

          <div className="mt-8 text-center z-10">
            <h3 className="text-3xl font-bold tracking-tight">
              {profile.firstName || "Ism"} {profile.lastName || "Familiya"}
            </h3>
            <p className="text-slate-400 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">
              {profile.gender === "male" ? "Foydalanuvchi (Erkak)" : profile.gender === "female" ? "Foydalanuvchi (Ayol)" : "Foydalanuvchi"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-10 w-full z-10">
            <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <Calendar className="text-purple-400 mb-2" size={20} />
              <span className="text-lg font-bold">{profile.age || "-"}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Yosh</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <Weight className="text-blue-400 mb-2" size={20} />
              <span className="text-lg font-bold">{profile.weight || "-"}</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Vazn</span>
            </div>
          </div>

          {/* Progress Bar */}
          {!editing && (
            <div className="mt-8 w-full px-4 z-10">
              <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-slate-500">
                <span>Tahrir bloklangan</span>
                <span>{daysLeft} kun qoldi</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      </>
  );
};

export default Profile;