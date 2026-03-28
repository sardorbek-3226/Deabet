import React, { useEffect, useState } from "react";
import {
  HeartPulse,
  Activity,
  Droplets,
  Thermometer,
  Brain,
  Moon,
  Footprints,
  GlassWater,
  Bell,
  ShieldCheck,
  TriangleAlert,
  User,
  Scale,
  Ruler,
  CalendarDays,
  Stethoscope,
  TrendingUp,
  SmilePlus,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function HealthPage() {
  const [healthData, setHealthData] = useState({
    name: "Sardor Ibrohimov",
    age: 18,
    weight: 68,
    height: 175,
    bloodGroup: "O+",
    bloodPressure: "120/80",
    heartRate: 72,
    temperature: 36.7,
    bloodSugar: 95,
    oxygen: 98,
    sleep: 82,
    steps: 6245,
    water: 1.8,
    calories: 320,
    stress: 24,
    healthScore: 87,
    lastCheck: "2 daqiqa oldin",
  });

  const [alerts] = useState([
    "Qand darajasi nazorat ostida, lekin kechqurun yana tekshirish tavsiya etiladi.",
    "So‘nggi 2 soatda jismoniy faollik pasaygan.",
    "Suv ichish normasi hali to‘liq bajarilmagan.",
  ]);

  const [recommendations] = useState([
    "Yana 400–500 ml suv iching.",
    "10–15 daqiqa piyoda yurish foydali bo‘ladi.",
    "Kechki ovqatda shirinlikni kamaytiring.",
    "Uyqu vaqtini kamida 7 soatga yetkazing.",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData((prev) => ({
        ...prev,
        heartRate: 68 + Math.floor(Math.random() * 12),
        temperature: (36.3 + Math.random() * 0.8).toFixed(1),
        bloodSugar: 88 + Math.floor(Math.random() * 18),
        oxygen: 96 + Math.floor(Math.random() * 3),
        sleep: 78 + Math.floor(Math.random() * 10),
        steps: prev.steps + Math.floor(Math.random() * 30),
        water: (Math.min(Number(prev.water) + Math.random() * 0.05, 2.5)).toFixed(1),
        calories: prev.calories + Math.floor(Math.random() * 8),
        stress: 20 + Math.floor(Math.random() * 15),
        healthScore: 84 + Math.floor(Math.random() * 10),
        lastCheck: "Hozirgina yangilandi",
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const organStatus = [
    {
      title: "Miya faoliyati",
      value: "Barqaror",
      desc: "Diqqat va stress ko‘rsatkichlari normal holatda.",
      icon: <Brain size={22} />,
      color: "from-violet-500 via-fuchsia-500 to-purple-600",
    },
    {
      title: "Yurak",
      value: "Yaxshi",
      desc: "Yurak urishi me’yorida va ritm barqaror.",
      icon: <HeartPulse size={22} />,
      color: "from-pink-500 via-rose-500 to-red-500",
    },
    {
      title: "Qon aylanishi",
      value: "Normal",
      desc: "Bosim va kislorod miqdori yaxshi holatda.",
      icon: <Droplets size={22} />,
      color: "from-cyan-500 via-sky-500 to-blue-600",
    },
    {
      title: "Umumiy holat",
      value: "Sog‘lom",
      desc: "Tana ko‘rsatkichlari muvozanatda turibdi.",
      icon: <ShieldCheck size={22} />,
      color: "from-emerald-500 via-teal-500 to-green-500",
    },
  ];

  const recentActivities = [
    "08:30 — Qon shakar darajasi tekshirildi",
    "10:00 — 250 ml suv ichildi",
    "12:40 — 1,200 qadam yurildi",
    "15:20 — Yurak urishi qayta o‘lchandi",
    "18:00 — AI tavsiyalar yangilandi",
  ];

  const getStatusColor = (value, type) => {
    if (type === "heartRate") {
      if (value < 60 || value > 100) return "text-rose-500";
      return "text-emerald-500";
    }
    if (type === "bloodSugar") {
      if (value > 120) return "text-rose-500";
      if (value > 100) return "text-amber-500";
      return "text-emerald-500";
    }
    if (type === "oxygen") {
      if (value < 95) return "text-rose-500";
      return "text-emerald-500";
    }
    return "text-emerald-500";
  };

  const StatCard = ({
    title,
    value,
    unit,
    icon,
    subtitle,
    colorClass,
    iconGradient,
    glow,
  }) => (
    <div
      className={`rounded-[28px] border border-white/40 bg-white/70 backdrop-blur-xl p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] ${glow}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className={`mt-2 text-3xl font-bold ${colorClass || "text-slate-800"}`}>
            {value}
            <span className="ml-1 text-base font-medium text-slate-500">{unit}</span>
          </h3>
          <p className="mt-2 text-xs leading-5 text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${iconGradient} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const ProgressCard = ({ label, value, color }) => (
    <div className="mb-5">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} shadow-sm`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
 <>
      <Navbar />
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dff7ff,_#eefcff,_#f8fbff,_#eefdf7)] p-4 md:p-8">

      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[34px] border border-white/50 bg-white/50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Hero */}
          <div className="bg-gradient-to-r from-cyan-600 via-sky-500 to-emerald-500 p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 text-sm text-cyan-100 md:text-base">
                  DiaCare • Salomatlik nazorati
                </p>
                <h1 className="text-3xl font-bold md:text-5xl">
                  Salomatlik Dashboard
                </h1>
                <p className="mt-3 max-w-2xl text-cyan-50">
                  Foydalanuvchining asosiy sog‘liq ko‘rsatkichlari, organlar holati,
                  kundalik faoliyati va AI tavsiyalari bitta sahifada jamlangan.
                </p>
              </div>

              <div className="min-w-[260px] rounded-3xl border border-white/20 bg-white/20 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/40 to-white/20">
                    <User size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{healthData.name}</h2>
                    <p className="text-sm text-cyan-100">
                      Oxirgi tekshiruv: {healthData.lastCheck}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/15 p-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span>Yosh</span>
                    </div>
                    <p className="mt-1 font-bold">{healthData.age}</p>
                  </div>

                  <div className="rounded-2xl bg-white/15 p-3">
                    <div className="flex items-center gap-2">
                      <Scale size={16} />
                      <span>Vazn</span>
                    </div>
                    <p className="mt-1 font-bold">{healthData.weight} kg</p>
                  </div>

                  <div className="rounded-2xl bg-white/15 p-3">
                    <div className="flex items-center gap-2">
                      <Ruler size={16} />
                      <span>Bo‘y</span>
                    </div>
                    <p className="mt-1 font-bold">{healthData.height} cm</p>
                  </div>

                  <div className="rounded-2xl bg-white/15 p-3">
                    <div className="flex items-center gap-2">
                      <Droplets size={16} />
                      <span>Qon guruhi</span>
                    </div>
                    <p className="mt-1 font-bold">{healthData.bloodGroup}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Yurak urishi"
                value={healthData.heartRate}
                unit="bpm"
                icon={<HeartPulse />}
                subtitle="Yurak ritmi real-time kuzatilmoqda"
                colorClass={getStatusColor(healthData.heartRate, "heartRate")}
                iconGradient="from-pink-500 via-rose-500 to-red-500"
                glow="hover:shadow-rose-100"
              />

              <StatCard
                title="Qon bosimi"
                value={healthData.bloodPressure}
                unit=""
                icon={<Stethoscope />}
                subtitle="Bosim normal diapazonda"
                colorClass="text-sky-600"
                iconGradient="from-cyan-500 via-sky-500 to-blue-600"
                glow="hover:shadow-sky-100"
              />

              <StatCard
                title="Qand darajasi"
                value={healthData.bloodSugar}
                unit="mg/dL"
                icon={<Activity />}
                subtitle="Diabet nazorati uchun muhim ko‘rsatkich"
                colorClass={getStatusColor(healthData.bloodSugar, "bloodSugar")}
                iconGradient="from-amber-400 via-orange-500 to-rose-500"
                glow="hover:shadow-orange-100"
              />

              <StatCard
                title="Tana harorati"
                value={healthData.temperature}
                unit="°C"
                icon={<Thermometer />}
                subtitle="Harorat stabil holatda"
                colorClass="text-orange-500"
                iconGradient="from-yellow-400 via-orange-500 to-red-500"
                glow="hover:shadow-yellow-100"
              />

              <StatCard
                title="Kislorod"
                value={healthData.oxygen}
                unit="%"
                icon={<Droplets />}
                subtitle="Qondagi kislorod to‘yinganligi"
                colorClass={getStatusColor(healthData.oxygen, "oxygen")}
                iconGradient="from-cyan-400 via-sky-500 to-indigo-500"
                glow="hover:shadow-cyan-100"
              />

              <StatCard
                title="Uyqu sifati"
                value={healthData.sleep}
                unit="%"
                icon={<Moon />}
                subtitle="Uyqu sog‘liq holatiga bevosita ta’sir qiladi"
                colorClass="text-violet-600"
                iconGradient="from-violet-500 via-fuchsia-500 to-purple-600"
                glow="hover:shadow-violet-100"
              />
            </div>

            {/* Organ + Score */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Organlar holati</h2>
                    <p className="text-sm text-slate-500">
                      Foydalanuvchining asosiy organizm tizimlari bo‘yicha tahlil
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                    <Brain size={22} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {organStatus.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[26px] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{item.title}</h3>
                          <p className="text-sm font-semibold text-emerald-600">{item.value}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Health Score</h2>
                    <p className="text-sm text-slate-500">Umumiy salomatlik bahosi</p>
                  </div>
                  <SmilePlus className="text-emerald-600" />
                </div>

                <div className="mb-6 flex items-center justify-center">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-cyan-500 to-sky-600 shadow-[0_15px_45px_rgba(14,165,233,0.30)]">
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-4xl font-bold text-slate-800">
                        {healthData.healthScore}
                      </span>
                      <span className="text-sm text-slate-500">/ 100</span>
                    </div>
                  </div>
                </div>

                <ProgressCard label="Yurak holati" value={90} color="from-pink-500 to-red-500" />
                <ProgressCard label="Qand nazorati" value={85} color="from-cyan-500 to-blue-600" />
                <ProgressCard label="Uyqu sifati" value={80} color="from-violet-500 to-purple-600" />
                <ProgressCard label="Jismoniy faollik" value={88} color="from-emerald-500 to-green-500" />
              </div>
            </div>

            {/* Alerts + AI + Daily */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Ogohlantirishlar</h2>
                    <p className="text-sm text-slate-500">Muhim kuzatuvlar</p>
                  </div>
                  <Bell className="text-amber-500" />
                </div>

                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-[22px] border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-4"
                    >
                      <TriangleAlert className="mt-1 text-amber-500" size={18} />
                      <p className="text-sm leading-6 text-slate-700">{alert}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">AI Tavsiyalar</h2>
                    <p className="text-sm text-slate-500">Siz uchun mos tavsiyalar</p>
                  </div>
                  <TrendingUp className="text-cyan-600" />
                </div>

                <div className="space-y-4">
                  {recommendations.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[22px] border border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-4"
                    >
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Kunlik faoliyat</h2>
                    <p className="text-sm text-slate-500">Bugungi natijalar</p>
                  </div>
                  <Footprints className="text-emerald-600" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-[22px] bg-gradient-to-r from-cyan-50 to-sky-50 p-4">
                    <div className="flex items-center gap-3">
                      <Footprints className="text-cyan-600" />
                      <span className="font-medium text-slate-700">Qadamlar</span>
                    </div>
                    <span className="font-bold text-slate-800">{healthData.steps}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                    <div className="flex items-center gap-3">
                      <GlassWater className="text-sky-600" />
                      <span className="font-medium text-slate-700">Suv</span>
                    </div>
                    <span className="font-bold text-slate-800">{healthData.water} L</span>
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] bg-gradient-to-r from-rose-50 to-orange-50 p-4">
                    <div className="flex items-center gap-3">
                      <Activity className="text-rose-500" />
                      <span className="font-medium text-slate-700">Kaloriya</span>
                    </div>
                    <span className="font-bold text-slate-800">{healthData.calories} kcal</span>
                  </div>

                  <div className="flex items-center justify-between rounded-[22px] bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4">
                    <div className="flex items-center gap-3">
                      <Brain className="text-violet-600" />
                      <span className="font-medium text-slate-700">Stress</span>
                    </div>
                    <span className="font-bold text-slate-800">{healthData.stress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom blocks */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <h2 className="mb-2 text-2xl font-bold text-slate-800">Bugungi holat xulosasi</h2>
                <p className="leading-7 text-slate-600">
                  Sizning asosiy sog‘liq ko‘rsatkichlaringiz hozircha yaxshi holatda.
                  Yurak urishi va qon bosimi barqaror. Qand darajasi nazorat ostida,
                  ammo jismoniy faollik va suv iste’molini biroz oshirish tavsiya etiladi.
                  Uyqu sifati o‘rtacha bo‘lib, umumiy sog‘liq darajangiz yaxshi baholangan.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/40 bg-white/75 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                <h2 className="mb-4 text-2xl font-bold text-slate-800">So‘nggi faoliyatlar</h2>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="rounded-[22px] border border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 text-sm text-slate-700"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-[32px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-6 text-white shadow-[0_15px_45px_rgba(14,165,233,0.25)] md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    Sog‘lig‘ingizni doimiy nazorat qiling
                  </h2>
                  <p className="mt-2 max-w-2xl text-white/90">
                    DiaCare sizga real-time monitoring, AI tavsiyalar va diabet nazorati
                    uchun kerakli barcha muhim ma’lumotlarni bitta joyda taqdim etadi.
                  </p>
                </div>
                <button className="rounded-2xl bg-white px-6 py-3 font-bold text-cyan-700 shadow-lg transition hover:scale-105 hover:shadow-2xl">
                  Batafsil tahlil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </>
  );
}