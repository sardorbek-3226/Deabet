import React, { useMemo, useState } from "react";
import {
  FaTemperatureHigh,
  FaHeartbeat,
  FaTint,
  FaLungs,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUserMd,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function EmergencyHealthPage() {
  const [healthData, setHealthData] = useState({
    temperature: 39.2,
    heartRate: 122,
    oxygen: 90,
    bloodPressureTop: 150,
    bloodPressureBottom: 95,
    bloodSugar: 215,
  });

  const [userLocation, setUserLocation] = useState("Farg‘ona, Yozyovon");

  const status = useMemo(() => {
    const alerts = [];

    // Harorat
    if (healthData.temperature >= 39) {
      alerts.push("Harorat juda yuqori. Bu organizmda jiddiy muammo bo‘lishi mumkin.");
    } else if (healthData.temperature >= 37.5) {
      alerts.push("Harorat me’yordan yuqori. Kuzatib boring.");
    }

    // Yurak urishi
    if (healthData.heartRate >= 120) {
      alerts.push("Yurak urishi juda tez. Tibbiy nazorat kerak bo‘lishi mumkin.");
    } else if (healthData.heartRate < 50) {
      alerts.push("Yurak urishi juda past. Bu xavfli bo‘lishi mumkin.");
    }

    // Kislorod
    if (healthData.oxygen <= 90) {
      alerts.push("Qondagi kislorod juda past. Darhol shifokorga murojaat qiling.");
    } else if (healthData.oxygen <= 94) {
      alerts.push("Qondagi kislorod pasaygan. Kuzatuv va maslahat zarur.");
    }

    // Qon bosimi
    if (healthData.bloodPressureTop >= 140 || healthData.bloodPressureBottom >= 90) {
      alerts.push("Qon bosimi yuqori. Shifokor bilan maslahatlashish kerak.");
    }

    // Qand miqdori
    if (healthData.bloodSugar >= 200) {
      alerts.push("Qondagi shakar miqdori yuqori. Tibbiy yordam zarur bo‘lishi mumkin.");
    } else if (healthData.bloodSugar < 70) {
      alerts.push("Qondagi shakar juda past. Bu xavfli holat bo‘lishi mumkin.");
    }

    let level = "normal";
    if (
      healthData.temperature >= 39 ||
      healthData.heartRate >= 120 ||
      healthData.oxygen <= 90 ||
      healthData.bloodSugar >= 200 ||
      healthData.bloodSugar < 70
    ) {
      level = "critical";
    } else if (alerts.length > 0) {
      level = "warning";
    }

    return { level, alerts };
  }, [healthData]);

  const getStatusStyle = () => {
    if (status.level === "critical") {
      return {
        box: "from-red-500 to-rose-600",
        text: "text-red-700",
        bg: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700",
        title: "Kritik holat",
        desc: "Ko‘rsatkichlar xavfli darajada. Darhol shifokorga murojaat qilish tavsiya etiladi.",
      };
    }

    if (status.level === "warning") {
      return {
        box: "from-yellow-400 to-orange-500",
        text: "text-yellow-700",
        bg: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700",
        title: "Ogohlantirish",
        desc: "Ba’zi ko‘rsatkichlar me’yordan chiqqan. Kuzatish va tibbiy maslahat kerak.",
      };
    }

    return {
      box: "from-emerald-400 to-green-500",
      text: "text-green-700",
      bg: "bg-green-50 border-green-200",
      badge: "bg-green-100 text-green-700",
      title: "Holat yaxshi",
      desc: "Ko‘rsatkichlar hozircha me’yor ichida.",
    };
  };

  const currentStyle = getStatusStyle();

  const openMap = () => {
    const query = encodeURIComponent(`${userLocation} shifoxona`);
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  const callEmergency = () => {
    window.location.href = "tel:103";
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400";

  const cardClass =
    "rounded-3xl bg-white shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all";

  return (
    <>
    <Navbar/>   
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-red-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-white shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Favqulodda Sog‘liq Holati
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Foydalanuvchi hayotiy ko‘rsatkichlarini kuzatish, xavfli holatlarni aniqlash
                va tezkor tibbiy yordamga yo‘naltirish sahifasi.
              </p>
            </div>

            <div className={`px-4 py-3 rounded-2xl ${currentStyle.badge} font-semibold text-center`}>
              {currentStyle.title}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status banner */}
            <div className={`rounded-3xl border p-6 ${currentStyle.bg}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${currentStyle.box} flex items-center justify-center text-white text-2xl shadow-md`}
                >
                  {status.level === "normal" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                </div>

                <div>
                  <h2 className={`text-2xl font-bold ${currentStyle.text}`}>
                    {currentStyle.title}
                  </h2>
                  <p className="text-gray-700 mt-2">{currentStyle.desc}</p>

                  {status.alerts.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {status.alerts.map((alert, index) => (
                        <li
                          key={index}
                          className="bg-white/80 border border-white rounded-xl px-4 py-3 text-gray-700"
                        >
                          • {alert}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Health cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Harorat</h3>
                  <FaTemperatureHigh className="text-red-500 text-xl" />
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800">
                  {healthData.temperature}°C
                </p>
                <p className="text-sm text-gray-500 mt-2">Tana harorati</p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Yurak urishi</h3>
                  <FaHeartbeat className="text-pink-500 text-xl" />
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800">
                  {healthData.heartRate} bpm
                </p>
                <p className="text-sm text-gray-500 mt-2">Bir daqiqadagi urish soni</p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Kislorod</h3>
                  <FaLungs className="text-cyan-500 text-xl" />
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800">
                  {healthData.oxygen}%
                </p>
                <p className="text-sm text-gray-500 mt-2">Qondagi kislorod miqdori</p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Qon bosimi</h3>
                  <FaTint className="text-blue-500 text-xl" />
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800">
                  {healthData.bloodPressureTop}/{healthData.bloodPressureBottom}
                </p>
                <p className="text-sm text-gray-500 mt-2">Sistolik / Diastolik</p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Qand miqdori</h3>
                  <FaTint className="text-purple-500 text-xl" />
                </div>
                <p className="text-3xl font-bold mt-4 text-gray-800">
                  {healthData.bloodSugar} mg/dL
                </p>
                <p className="text-sm text-gray-500 mt-2">Qondagi shakar darajasi</p>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Shifokor holati</h3>
                  <FaUserMd className="text-emerald-500 text-xl" />
                </div>
                <p className="text-lg font-bold mt-4 text-gray-800">
                  {status.level === "critical"
                    ? "Darhol murojaat qiling"
                    : status.level === "warning"
                    ? "Maslahat zarur"
                    : "Hozircha barqaror"}
                </p>
                <p className="text-sm text-gray-500 mt-2">AI tavsiya natijasi</p>
              </div>
            </div>

            {/* Input panel */}
            <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Ko‘rsatkichlarni o‘zgartirish
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Harorat (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    className={inputClass}
                    value={healthData.temperature}
                    onChange={(e) =>
                      setHealthData({ ...healthData, temperature: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Yurak urishi (bpm)</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={healthData.heartRate}
                    onChange={(e) =>
                      setHealthData({ ...healthData, heartRate: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Kislorod (%)</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={healthData.oxygen}
                    onChange={(e) =>
                      setHealthData({ ...healthData, oxygen: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Qand (mg/dL)</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={healthData.bloodSugar}
                    onChange={(e) =>
                      setHealthData({ ...healthData, bloodSugar: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Qon bosimi yuqori</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={healthData.bloodPressureTop}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        bloodPressureTop: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Qon bosimi past</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={healthData.bloodPressureBottom}
                    onChange={(e) =>
                      setHealthData({
                        ...healthData,
                        bloodPressureBottom: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Lokatsiya va yordam
              </h2>

              <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                <div className="w-full">
                  <p className="text-sm text-gray-500">Joriy hudud</p>
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className={`${inputClass} mt-2`}
                  />
                </div>
              </div>

              <div className="grid gap-3 mt-5">
                <button
                  onClick={openMap}
                  className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition"
                >
                  Eng yaqin shifoxonani ochish
                </button>

                <button
                  onClick={callEmergency}
                  className="w-full rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold py-3 transition flex items-center justify-center gap-2"
                >
                  <FaPhoneAlt />
                  Tez yordamga qo‘ng‘iroq
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                AI tavsiyasi
              </h2>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4">
                  Suv ichishni unutmang va ko‘rsatkichlarni qayta tekshirib boring.
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
                  Agar holat yomonlashsa, o‘zingiz davolanishga urinmay, mutaxassisga murojaat qiling.
                </div>

                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4">
                  Nafas qisilishi, hush aylanishi yoki kuchli og‘riq bo‘lsa, darhol tez yordam chaqiring.
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg p-6">
              <h2 className="text-xl font-bold">Muhim eslatma</h2>
              <p className="mt-3 text-sm leading-6 text-white/90">
                Bu sahifa foydalanuvchiga dastlabki ogohlantirish berish uchun.
                Yakuniy tashxisni faqat shifokor qo‘yadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}