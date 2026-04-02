import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
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
  FaLocationArrow,
  FaShieldAlt,
  FaClock,
  FaHospital,
  FaUserFriends,
  FaNotesMedical,
  FaArrowRight,
  FaAmbulance,
  FaHistory,
  FaProcedures,
} from "react-icons/fa";

export default function EmergencyHealthPage() {
  const [healthData] = useState({
    temperature: 39.2,
    heartRate: 122,
    oxygen: 90,
    bloodPressureTop: 150,
    bloodPressureBottom: 95,
    bloodSugar: 215,
  });

  const [coords, setCoords] = useState(null);
  const [userLocation, setUserLocation] = useState("Lokatsiya aniqlanmoqda...");
  const [locationError, setLocationError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [history, setHistory] = useState([]);

  const [profileData, setProfileData] = useState({
    firstName: "Foydalanuvchi",
    lastName: "",
    age: "",
    weight: "",
    gender: "",
    bloodGroup: "Noma’lum",
    allergy: "Mavjud emas",
    chronicDisease: "Mavjud emas",
    emergencyContactName: "Yaqin inson",
    emergencyContactPhone: "+998901234567",
  });

  const [symptoms] = useState([
    "Nafas qisilishi",
    "Bosh aylanishi",
    "Tana holsizligi",
    "Yuqori harorat",
  ]);

  useEffect(() => {
    const now = new Date();
    setLastUpdated(
      now.toLocaleString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));

    if (storedProfile) {
      setProfileData((prev) => ({
        ...prev,
        firstName: storedProfile.firstName || prev.firstName,
        lastName: storedProfile.lastName || prev.lastName,
        age: storedProfile.age || prev.age,
        weight: storedProfile.weight || prev.weight,
        gender: storedProfile.gender || prev.gender,
        bloodGroup: storedProfile.bloodGroup || "Noma’lum",
        allergy: storedProfile.allergy || "Mavjud emas",
        chronicDisease: storedProfile.chronicDisease || "Mavjud emas",
        emergencyContactName:
          storedProfile.emergencyContactName || "Yaqin inson",
        emergencyContactPhone:
          storedProfile.emergencyContactPhone || "+998901234567",
      }));
    }
  }, []);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("emergencyHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Brauzer geolocation ni qo‘llamaydi.");
      setUserLocation("Lokatsiya mavjud emas");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoords({ lat, lng });
        setUserLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
      },
      () => {
        setLocationError("Lokatsiyani olishga ruxsat berilmadi.");
        setUserLocation("Lokatsiya olinmadi");
      }
    );
  }, []);

  const status = useMemo(() => {
    const alerts = [];

    if (healthData.temperature >= 39) {
      alerts.push("Harorat juda yuqori. Bu jiddiy holat bo‘lishi mumkin.");
    } else if (healthData.temperature >= 37.5) {
      alerts.push("Harorat me’yordan yuqori, kuzatuv zarur.");
    }

    if (healthData.heartRate >= 120) {
      alerts.push("Yurak urishi juda tez. Darhol nazorat kerak.");
    } else if (healthData.heartRate < 50) {
      alerts.push("Yurak urishi juda past. Bu xavfli bo‘lishi mumkin.");
    }

    if (healthData.oxygen <= 90) {
      alerts.push("Qondagi kislorod juda past. Tezkor tibbiy yordam kerak.");
    } else if (healthData.oxygen <= 94) {
      alerts.push("Qondagi kislorod pasaygan.");
    }

    if (
      healthData.bloodPressureTop >= 140 ||
      healthData.bloodPressureBottom >= 90
    ) {
      alerts.push("Qon bosimi yuqori. Shifokor nazorati tavsiya etiladi.");
    }

    if (healthData.bloodSugar >= 200) {
      alerts.push("Qondagi shakar yuqori. Tibbiy ko‘rik kerak bo‘lishi mumkin.");
    } else if (healthData.bloodSugar < 70) {
      alerts.push("Qondagi shakar juda past. Bu xavfli holat.");
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

  const riskScore = useMemo(() => {
    let score = 0;

    if (healthData.temperature >= 39) score += 25;
    else if (healthData.temperature >= 37.5) score += 10;

    if (healthData.heartRate >= 120 || healthData.heartRate < 50) score += 20;

    if (healthData.oxygen <= 90) score += 25;
    else if (healthData.oxygen <= 94) score += 10;

    if (
      healthData.bloodPressureTop >= 140 ||
      healthData.bloodPressureBottom >= 90
    ) {
      score += 10;
    }

    if (healthData.bloodSugar >= 200 || healthData.bloodSugar < 70) {
      score += 20;
    }

    return Math.min(score, 100);
  }, [healthData]);

  const doctorRecommendation = useMemo(() => {
    if (riskScore >= 80) return "Darhol shifoxonaga boring";
    if (riskScore >= 50) return "Tez orada shifokor bilan bog‘laning";
    if (riskScore >= 25) return "Uyda kuzatish va maslahat zarur";
    return "Hozircha barqaror";
  }, [riskScore]);

  useEffect(() => {
    if (status.level === "critical") {
      setShowAlert(true);
    }
  }, [status.level]);

  useEffect(() => {
    const newEntry = {
      time: new Date().toLocaleString("uz-UZ"),
      level: status.level,
      riskScore,
    };

    const existing =
      JSON.parse(localStorage.getItem("emergencyHistory")) || [];

    const isDuplicate =
      existing.length > 0 &&
      existing[0].level === newEntry.level &&
      existing[0].riskScore === newEntry.riskScore;

    if (!isDuplicate) {
      const updated = [newEntry, ...existing].slice(0, 5);
      localStorage.setItem("emergencyHistory", JSON.stringify(updated));
      setHistory(updated);
    }
  }, [status.level, riskScore]);

  const getStatusStyle = () => {
    if (status.level === "critical") {
      return {
        box: "from-red-500 to-rose-600",
        text: "text-red-700",
        bg: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700 animate-pulse",
        title: "Kritik holat",
        desc: "Ko‘rsatkichlar xavfli darajada. Darhol shifokorga murojaat qilish kerak.",
      };
    }

    if (status.level === "warning") {
      return {
        box: "from-yellow-400 to-orange-500",
        text: "text-yellow-700",
        bg: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700",
        title: "Ogohlantirish",
        desc: "Ba’zi ko‘rsatkichlar me’yordan chiqqan. Kuzatish va maslahat zarur.",
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
    if (coords) {
      window.open(
        `https://www.google.com/maps/search/hospital/@${coords.lat},${coords.lng},15z`,
        "_blank"
      );
    } else {
      window.open("https://www.google.com/maps/search/yaqin+shifoxona", "_blank");
    }
  };

  const callEmergency = () => {
    window.location.href = "tel:103";
  };

  const callEmergencyContact = () => {
    const cleaned = (profileData.emergencyContactPhone || "").replace(/\s/g, "");
    window.location.href = `tel:${cleaned}`;
  };

  const cardClass =
    "rounded-3xl bg-white shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all";

  const riskItems = [
    {
      label: "Harorat",
      value: `${healthData.temperature}°C`,
      risk:
        healthData.temperature >= 39
          ? "Yuqori xavf"
          : healthData.temperature >= 37.5
          ? "Nazorat"
          : "Normal",
      icon: <FaTemperatureHigh className="text-red-500 text-xl" />,
    },
    {
      label: "Yurak urishi",
      value: `${healthData.heartRate} bpm`,
      risk:
        healthData.heartRate >= 120 || healthData.heartRate < 50
          ? "Xavfli"
          : "Barqaror",
      icon: <FaHeartbeat className="text-pink-500 text-xl" />,
    },
    {
      label: "Kislorod",
      value: `${healthData.oxygen}%`,
      risk: healthData.oxygen <= 90 ? "Juda past" : "Qabul qilsa bo‘ladi",
      icon: <FaLungs className="text-cyan-500 text-xl" />,
    },
    {
      label: "Qon bosimi",
      value: `${healthData.bloodPressureTop}/${healthData.bloodPressureBottom}`,
      risk:
        healthData.bloodPressureTop >= 140 ||
        healthData.bloodPressureBottom >= 90
          ? "Yuqori"
          : "Normal",
      icon: <FaTint className="text-blue-500 text-xl" />,
    },
    {
      label: "Qand miqdori",
      value: `${healthData.bloodSugar} mg/dL`,
      risk:
        healthData.bloodSugar >= 200
          ? "Yuqori xavf"
          : healthData.bloodSugar < 70
          ? "Past xavf"
          : "Normal",
      icon: <FaTint className="text-purple-500 text-xl" />,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br mt-20 from-sky-50 via-white to-red-50 p-4 md:p-8">
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
              <FaExclamationTriangle />
            </div>

            <h2 className="mt-4 text-center text-2xl font-bold text-red-600">
              Kritik holat aniqlandi
            </h2>

            <p className="mt-3 text-center text-gray-600">
              Ko‘rsatkichlar xavfli darajada. Darhol tibbiy yordam olish tavsiya etiladi.
            </p>

            <div className="mt-6 grid gap-3">
              <button
                onClick={callEmergency}
                className="w-full rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                103 ga qo‘ng‘iroq qilish
              </button>

              <button
                onClick={openMap}
                className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Eng yaqin shifoxona
              </button>

              <button
                onClick={callEmergencyContact}
                className="w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Yaqin insonga qo‘ng‘iroq
              </button>

              <button
                onClick={() => setShowAlert(false)}
                className="w-full rounded-2xl bg-slate-100 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Favqulodda Sog‘liq Holati
              </h1>
              <p className="mt-2 text-sm text-gray-600 md:text-base">
                Foydalanuvchining asosiy hayotiy ko‘rsatkichlari tahlil qilinib,
                xavfli vaziyatlarda tezkor harakat qilish uchun yo‘naltiriladi.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div
                className={`rounded-2xl px-4 py-3 text-center font-semibold ${currentStyle.badge}`}
              >
                {currentStyle.title}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FaClock />
                <span>Oxirgi yangilanish: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className={`rounded-3xl border p-6 ${currentStyle.bg}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${currentStyle.box} text-2xl text-white shadow-md`}
                >
                  {status.level === "normal" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationTriangle />
                  )}
                </div>

                <div className="flex-1">
                  <h2 className={`text-2xl font-bold ${currentStyle.text}`}>
                    {currentStyle.title}
                  </h2>
                  <p className="mt-2 text-gray-700">{currentStyle.desc}</p>

                  {status.alerts.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {status.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white bg-white/80 px-4 py-3 text-gray-700"
                        >
                          • {alert}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {riskItems.map((item) => (
                <div key={item.label} className={cardClass}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">{item.label}</h3>
                    {item.icon}
                  </div>

                  <p className="mt-4 text-3xl font-bold text-gray-800">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">{item.risk}</p>
                </div>
              ))}

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Shifokor holati</h3>
                  <FaUserMd className="text-emerald-500 text-xl" />
                </div>

                <p className="mt-4 text-lg font-bold text-gray-800">
                  {status.level === "critical"
                    ? "Darhol murojaat qiling"
                    : status.level === "warning"
                    ? "Maslahat zarur"
                    : "Barqaror"}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  AI xavf tahlili natijasi
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">Xavf darajasi</h2>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">Umumiy risk</span>
                  <span className="font-bold text-gray-800">{riskScore}%</span>
                </div>

                <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      riskScore >= 80
                        ? "bg-red-500"
                        : riskScore >= 50
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-gray-500">Tibbiy tavsiya</p>
                <p className="mt-1 text-lg font-bold text-gray-800">
                  {doctorRecommendation}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">
                Favqulodda tavsiyalar
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                  <div className="flex items-center gap-3 text-red-600">
                    <FaAmbulance />
                    <h3 className="font-semibold">Tez yordam</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Nafas qisilishi, kuchli og‘riq yoki hush aylanishi bo‘lsa,
                    darhol tez yordam chaqiring.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3 text-blue-600">
                    <FaHospital />
                    <h3 className="font-semibold">Shifoxona</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Yaqin tibbiy markazga tez yetib borish uchun xaritani oching.
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
                  <div className="flex items-center gap-3 text-yellow-600">
                    <FaShieldAlt />
                    <h3 className="font-semibold">Xavfsizlik</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    O‘zingizni davolashga urinmang, mutaxassis bilan bog‘laning.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <FaUserMd />
                    <h3 className="font-semibold">Nazorat</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Belgilar davom etsa, shifokor bilan to‘liq tekshiruvdan o‘ting.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <FaHistory className="text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Oxirgi emergency holatlar
                </h2>
              </div>

              <div className="space-y-3">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <p className="font-semibold capitalize text-gray-800">
                        {item.level}
                      </p>
                      <p className="text-sm text-gray-500">
                        Risk: {item.riskScore}%
                      </p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Hali tarix mavjud emas.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">
                Lokatsiya va yordam
              </h2>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-xl text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joriy lokatsiya</p>
                    <p className="mt-1 break-words font-semibold text-gray-800">
                      {userLocation}
                    </p>
                    {locationError && (
                      <p className="mt-2 text-sm text-red-500">{locationError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <button
                  onClick={openMap}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <FaLocationArrow />
                  Eng yaqin shifoxona
                </button>

                <button
                  onClick={callEmergency}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  <FaPhoneAlt />
                  103 ga qo‘ng‘iroq
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <FaUserFriends className="text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Emergency Contact
                </h2>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-gray-500">Yaqin inson</p>
                <p className="mt-1 text-lg font-bold text-gray-800">
                  {profileData.emergencyContactName}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {profileData.emergencyContactPhone}
                </p>
              </div>

              <button
                onClick={callEmergencyContact}
                className="mt-4 w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Emergency contact ga qo‘ng‘iroq
              </button>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <FaProcedures className="text-rose-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Kuzatilayotgan belgilar
                </h2>
              </div>

              <div className="space-y-3">
                {symptoms.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-gray-700"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <FaNotesMedical className="text-cyan-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Profil ma’lumotlari
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <span className="text-gray-500">F.I.SH:</span>{" "}
                  <span className="font-semibold">
                    {profileData.firstName} {profileData.lastName}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <span className="text-gray-500">Qon guruhi:</span>{" "}
                  <span className="font-semibold">{profileData.bloodGroup}</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <span className="text-gray-500">Allergiya:</span>{" "}
                  <span className="font-semibold">{profileData.allergy}</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <span className="text-gray-500">Surunkali kasallik:</span>{" "}
                  <span className="font-semibold">
                    {profileData.chronicDisease}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Tezkor amallar
              </h2>

              <div className="grid gap-3">
                <Link
                  to="/salomatlik"
                  className="flex items-center justify-between rounded-2xl bg-cyan-50 px-4 py-3 font-semibold text-cyan-700 transition hover:bg-cyan-100"
                >
                  <span>Salomatlik sahifasi</span>
                  <FaArrowRight />
                </Link>

                <Link
                  to="/doctorConsultation"
                  className="flex items-center justify-between rounded-2xl bg-violet-50 px-4 py-3 font-semibold text-violet-700 transition hover:bg-violet-100"
                >
                  <span>Doctor consultation</span>
                  <FaArrowRight />
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <span>Profilni yangilash</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold">Muhim eslatma</h2>
              <p className="mt-3 text-sm leading-6 text-white/90">
                Bu sahifa dastlabki ogohlantirish uchun xizmat qiladi.
                Yakuniy tashxis va davolash rejasini faqat shifokor belgilaydi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}