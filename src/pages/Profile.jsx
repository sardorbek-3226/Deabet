import React, { useEffect, useMemo, useState } from "react";
import {
  Camera,
  Calendar,
  Weight,
  Ruler,
  Phone,
  MapPin,
  Droplets,
  ShieldAlert,
  NotebookText,
  HeartPulse,
  UserRound,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    bloodGroup: "",
    allergy: "",
    chronicDisease: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    address: "",
    notes: "",
    avatar: "",
  });

  const [savedDate, setSavedDate] = useState(null);
  const [editing, setEditing] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedDate = localStorage.getItem("profileSavedDate");

    if (storedProfile) {
      setProfile((prev) => ({
        ...prev,
        ...storedProfile,
      }));
    }

    if (storedDate) {
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
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const bmi = useMemo(() => {
    const weight = Number(profile.weight);
    const heightCm = Number(profile.height);

    if (!weight || !heightCm) return null;

    const heightM = heightCm / 100;
    const result = weight / (heightM * heightM);
    return result.toFixed(1);
  }, [profile.weight, profile.height]);

  const bmiStatus = useMemo(() => {
    if (!bmi) return "Hisoblanmagan";
    const num = Number(bmi);

    if (num < 18.5) return "Vazn past";
    if (num < 25) return "Normal";
    if (num < 30) return "Ortiqcha vazn";
    return "Yuqori BMI";
  }, [bmi]);

  const requiredFields = [
    profile.firstName,
    profile.lastName,
    profile.age,
    profile.weight,
    profile.height,
    profile.gender,
    profile.bloodGroup,
    profile.emergencyContactName,
    profile.emergencyContactPhone,
  ];

  const completionPercent = Math.round(
    (requiredFields.filter(Boolean).length / requiredFields.length) * 100
  );

  const handleSave = () => {
    if (!profile.firstName || !profile.lastName) {
      setMessage("Iltimos, ism va familiyani kiriting.");
      return;
    }

    if (!profile.emergencyContactName || !profile.emergencyContactPhone) {
      setMessage("Emergency contact ma’lumotlarini to‘ldiring.");
      return;
    }

    const now = new Date();
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("profileSavedDate", now.toISOString());

    setSavedDate(now.toISOString());
    setEditing(false);
    setMessage("Profil muvaffaqiyatli saqlandi.");
  };

  const handleUnlock = () => {
    setEditing(true);
    setMessage("Profilni qayta tahrirlash ochildi.");
  };

  const daysLeft = savedDate
    ? Math.max(
        0,
        15 -
          Math.floor((new Date() - new Date(savedDate)) / (1000 * 60 * 60 * 24))
      )
    : 0;

  const progressPercent = ((15 - daysLeft) / 15) * 100;

  const inputClass =
    "w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed";

  const sectionTitleClass =
    "mb-4 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-slate-800";

  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-20 bg-[radial-gradient(circle_at_top_left,_#e0f7ff,_#f6fbff,_#fdfefe)] p-4 md:p-8 text-slate-800">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-[2rem] border border-white/60 bg-white/80 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 p-6 text-white md:p-8">
            <p className="text-sm text-cyan-100">DiaCare • Shaxsiy profil</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-black">
              Foydalanuvchi Profili
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
              Bu sahifada foydalanuvchining shaxsiy, tibbiy va favqulodda holat
              uchun kerakli ma’lumotlari saqlanadi. Emergency page shu
              ma’lumotlardan foydalanadi.
            </p>
          </div>

          <div className="p-5 md:p-8">
            {message && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                  message.includes("muvaffaqiyatli") || message.includes("ochildi")
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {message.includes("muvaffaqiyatli") || message.includes("ochildi") ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertTriangle size={18} />
                )}
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <UserRound size={20} />
                  Asosiy ma’lumotlar
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      ISM
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      placeholder="Sardor"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      FAMILIYA
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      placeholder="Ibrohimov"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      YOSH
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      placeholder="18"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      JINS
                    </label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      disabled={!editing}
                      className={inputClass}
                    >
                      <option value="">Tanlang</option>
                      <option value="male">Erkak</option>
                      <option value="female">Ayol</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <HeartPulse size={20} />
                  Tana ko‘rsatkichlari
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      VAZN (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={profile.weight}
                      onChange={handleChange}
                      placeholder="68"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      BO‘Y (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={profile.height}
                      onChange={handleChange}
                      placeholder="175"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      QON GURUHI
                    </label>
                    <select
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      disabled={!editing}
                      className={inputClass}
                    >
                      <option value="">Tanlang</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <ShieldAlert size={20} />
                  Tibbiy ma’lumotlar
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      ALLERGIYA
                    </label>
                    <input
                      type="text"
                      name="allergy"
                      value={profile.allergy}
                      onChange={handleChange}
                      placeholder="Masalan: penitsillin"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      SURUNKALI KASALLIK
                    </label>
                    <input
                      type="text"
                      name="chronicDisease"
                      value={profile.chronicDisease}
                      onChange={handleChange}
                      placeholder="Masalan: diabet"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      QO‘SHIMCHA IZOH
                    </label>
                    <textarea
                      name="notes"
                      value={profile.notes}
                      onChange={handleChange}
                      placeholder="Qo‘shimcha ma’lumot..."
                      disabled={!editing}
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <Phone size={20} />
                  Emergency Contact
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      YAQIN INSON ISMI
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={profile.emergencyContactName}
                      onChange={handleChange}
                      placeholder="Ota / ona / aka / opa"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      TELEFON RAQAMI
                    </label>
                    <input
                      type="text"
                      name="emergencyContactPhone"
                      value={profile.emergencyContactPhone}
                      onChange={handleChange}
                      placeholder="+998 90 123 45 67"
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-400">
                      MANZIL
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="Farg‘ona, Yozyovon..."
                      disabled={!editing}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSave}
                disabled={!editing}
                className={`flex-1 rounded-2xl py-4 text-sm font-black uppercase tracking-widest transition-all active:scale-95 ${
                  editing
                    ? "bg-slate-900 text-white shadow-lg hover:bg-cyan-700"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                Saqlash
              </button>

              {!editing && (
                <button
                  onClick={handleUnlock}
                  className="flex-1 rounded-2xl bg-cyan-50 py-4 text-sm font-black uppercase tracking-widest text-cyan-700 transition hover:bg-cyan-100"
                >
                  Qayta tahrirlash
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="h-40 w-40 overflow-hidden rounded-[2.5rem] border-4 border-slate-800 shadow-2xl">
                  <img
                    src={profile.avatar || "https://via.placeholder.com/200x200?text=Avatar"}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                {editing && (
                  <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-2xl border-4 border-slate-900 bg-cyan-600 p-3 shadow-xl transition hover:bg-cyan-500">
                    <Camera size={20} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <h3 className="mt-8 text-3xl font-bold tracking-tight">
                {profile.firstName || "Ism"} {profile.lastName || "Familiya"}
              </h3>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                {profile.gender === "male"
                  ? "Foydalanuvchi (Erkak)"
                  : profile.gender === "female"
                  ? "Foydalanuvchi (Ayol)"
                  : "Foydalanuvchi"}
              </p>

              <div className="mt-8 grid w-full grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">
                  <Calendar className="mx-auto mb-2 text-cyan-400" size={20} />
                  <span className="block text-lg font-bold">{profile.age || "-"}</span>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Yosh
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">
                  <Weight className="mx-auto mb-2 text-blue-400" size={20} />
                  <span className="block text-lg font-bold">{profile.weight || "-"}</span>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Vazn
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">
                  <Ruler className="mx-auto mb-2 text-emerald-400" size={20} />
                  <span className="block text-lg font-bold">{profile.height || "-"}</span>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Bo‘y
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">
                  <Droplets className="mx-auto mb-2 text-rose-400" size={20} />
                  <span className="block text-lg font-bold">
                    {profile.bloodGroup || "-"}
                  </span>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Qon guruhi
                  </span>
                </div>
              </div>

              {!editing && (
                <div className="mt-8 w-full px-2">
                  <div className="mb-2 flex justify-between text-[10px] font-bold uppercase text-slate-500">
                    <span>Tahrir bloklangan</span>
                    <span>{daysLeft} kun qoldi</span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-xl font-black text-slate-800">Profil to‘liqligi</h3>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">To‘ldirilganlik</span>
                <span className="font-bold text-slate-800">{completionPercent}%</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">
                Emergency contact va qon guruhi to‘ldirilgan bo‘lsa, favqulodda sahifa ancha foydali ishlaydi.
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Allergiya va surunkali kasallik ma’lumotlari shifokor uchun muhim.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-xl font-black text-slate-800">Sog‘liq xulosasi</h3>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-cyan-50 p-4">
                <p className="text-sm text-slate-500">BMI</p>
                <p className="text-xl font-bold text-slate-800">{bmi || "-"}</p>
                <p className="text-sm text-cyan-700 mt-1">{bmiStatus}</p>
              </div>

              <div className="rounded-2xl bg-rose-50 p-4">
                <p className="text-sm text-slate-500">Allergiya</p>
                <p className="font-semibold text-slate-800">
                  {profile.allergy || "Ko‘rsatilmagan"}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-sm text-slate-500">Surunkali kasallik</p>
                <p className="font-semibold text-slate-800">
                  {profile.chronicDisease || "Ko‘rsatilmagan"}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm text-slate-500">Emergency contact</p>
                <p className="font-semibold text-slate-800">
                  {profile.emergencyContactName || "Ko‘rsatilmagan"}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  {profile.emergencyContactPhone || "Telefon yo‘q"}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <p className="text-sm text-slate-500">Manzil</p>
                <p className="font-semibold text-slate-800">
                  {profile.address || "Ko‘rsatilmagan"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 to-cyan-600 p-6 text-white shadow-xl">
            <h3 className="text-xl font-black">Muhim eslatma</h3>
            <p className="mt-3 text-sm leading-6 text-white/90">
              Bu profil ma’lumotlari Emergency Health sahifasi bilan ulanadi.
              Shuning uchun emergency contact, qon guruhi va sog‘liq bo‘yicha
              asosiy ma’lumotlarni to‘liq saqlash foydali bo‘ladi.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;