import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaHeartbeat,
  FaCalendarAlt,
  FaTint,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function StatistikaPage() {
  const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState("weekly");

  const weeklyData = [
    { label: "Du", value: 90 },
    { label: "Se", value: 110 },
    { label: "Ch", value: 100 },
    { label: "Pa", value: 130 },
    { label: "Ju", value: 120 },
    { label: "Sha", value: 95 },
    { label: "Ya", value: 105 },
  ];

  const monthlyData = [
    { label: "1-hafta", value: 102 },
    { label: "2-hafta", value: 118 },
    { label: "3-hafta", value: 96 },
    { label: "4-hafta", value: 125 },
  ];

  const currentData = activeRange === "weekly" ? weeklyData : monthlyData;

  const stats = useMemo(() => {
    const values = currentData.map((item) => item.value);
    const average = Math.round(
      values.reduce((sum, current) => sum + current, 0) / values.length
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const first = values[0];
    const last = values[values.length - 1];
    const trend = Math.round(((last - first) / first) * 100);

    return {
      average,
      min,
      max,
      trend,
      latest: last,
    };
  }, [currentData]);

  const maxBarValue = Math.max(...currentData.map((item) => item.value));

  const getHealthStatus = (avg) => {
    if (avg < 70) {
      return {
        text: "Past holat",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        desc: "Ko‘rsatkich past. Oziqlanish va nazoratni kuchaytirish kerak.",
      };
    }
    if (avg <= 140) {
      return {
        text: "Barqaror holat",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        desc: "Ko‘rsatkichlar umumiy hisobda normal diapazonda.",
      };
    }
    return {
      text: "Yuqori holat",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      desc: "Ko‘rsatkichlar yuqorilashga moyil. Diet va monitoring muhim.",
    };
  };

  const health = getHealthStatus(stats.average);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-md border border-gray-100 text-gray-700 hover:bg-gray-50 transition"
        >
          <FaArrowLeft />
          Ortga qaytish
        </button>

        {/* Header */}
        <div className="rounded-[28px] bg-white/90 backdrop-blur-md shadow-xl border border-white/70 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
                <FaChartLine />
                Aqlli statistik kuzatuv
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Statistika Dashboard
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
                Qand ko‘rsatkichlaringizni haftalik va oylik ko‘rinishda tahlil
                qiling, o‘rtacha natijalarni kuzating va sog‘liq holatingiz
                bo‘yicha tezkor insight oling.
              </p>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center text-3xl shadow-lg">
              <FaHeartbeat />
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveRange("weekly")}
            className={`px-5 py-2.5 rounded-full font-semibold transition ${
              activeRange === "weekly"
                ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            Haftalik
          </button>

          <button
            onClick={() => setActiveRange("monthly")}
            className={`px-5 py-2.5 rounded-full font-semibold transition ${
              activeRange === "monthly"
                ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            Oylik
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">O‘rtacha qiymat</span>
              <FaTint className="text-sky-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.average}
            </h2>
            <p className="text-sm text-gray-500 mt-1">mg/dL</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Eng past</span>
              <FaArrowDown className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.min}
            </h2>
            <p className="text-sm text-gray-500 mt-1">mg/dL</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Eng yuqori</span>
              <FaArrowUp className="text-red-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.max}
            </h2>
            <p className="text-sm text-gray-500 mt-1">mg/dL</p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">So‘nggi natija</span>
              <FaCalendarAlt className="text-indigo-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.latest}
            </h2>
            <p className="text-sm text-gray-500 mt-1">mg/dL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="xl:col-span-2 bg-white rounded-[28px] p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {activeRange === "weekly"
                    ? "Haftalik ko‘rsatkichlar"
                    : "Oylik ko‘rsatkichlar"}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Bar chart orqali dinamik o‘zgarishlarni ko‘ring
                </p>
              </div>

              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  stats.trend >= 0
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                Trend: {stats.trend > 0 ? "+" : ""}
                {stats.trend}%
              </div>
            </div>

            <div className="h-[320px] flex items-end gap-3 sm:gap-4">
              {currentData.map((item, index) => {
                const heightPercent = (item.value / maxBarValue) * 100;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center justify-end group"
                  >
                    <span className="mb-2 text-xs sm:text-sm font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition">
                      {item.value}
                    </span>

                    <div className="w-full flex justify-center items-end h-[240px]">
                      <div
                        className="w-full max-w-[56px] rounded-t-2xl bg-gradient-to-t from-indigo-600 via-sky-500 to-cyan-300 shadow-md transition-all duration-300 group-hover:scale-105"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <span className="mt-3 text-xs sm:text-sm font-medium text-gray-500">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* visual baseline */}
            <div className="mt-6 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                style={{ width: `${Math.min((stats.average / 160) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Insight panel */}
          <div className="space-y-6">
            <div
              className={`rounded-[28px] p-6 border shadow-md ${health.bg} ${health.border}`}
            >
              <h3 className={`text-lg font-bold mb-3 ${health.color}`}>
                AI Insight
              </h3>
              <p className="text-gray-800 font-semibold mb-2">{health.text}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {health.desc}
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Tezkor tavsiyalar
              </h3>

              <div className="space-y-3">
                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="font-semibold text-sky-700 mb-1">
                    1. Kunlik monitoring
                  </p>
                  <p className="text-sm text-gray-600">
                    Har kuni bir xil vaqtda o‘lchash natijani aniqroq ko‘rsatadi.
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="font-semibold text-indigo-700 mb-1">
                    2. Ovqat bilan bog‘lash
                  </p>
                  <p className="text-sm text-gray-600">
                    Ko‘rsatkichni nonushta, tushlik yoki kechki ovqatdan keyin
                    solishtirib boring.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="font-semibold text-emerald-700 mb-1">
                    3. Barqarorlikni saqlash
                  </p>
                  <p className="text-sm text-gray-600">
                    O‘rtacha qiymatni normada ushlab turish uzoq muddatli nazorat
                    uchun foydali.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white rounded-[28px] p-6 shadow-lg">
              <p className="text-sm text-indigo-200 mb-2">
                Smart summary
              </p>
              <h3 className="text-2xl font-bold mb-3">
                {stats.average} mg/dL
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Sizning {activeRange === "weekly" ? "haftalik" : "oylik"} o‘rtacha
                ko‘rsatkichingiz shu qiymatga teng. Tahlilga qaraganda tizim
                umumiy holatni kuzatish uchun yetarli ma’lumot ko‘rsatmoqda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}