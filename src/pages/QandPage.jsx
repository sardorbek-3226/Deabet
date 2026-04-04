import React, { useEffect, useMemo, useState } from "react";
import {
  FaHeartbeat,
  FaPlus,
  FaTrash,
  FaTint,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function QandPage() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("bloodSugarHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("bloodSugarHistory", JSON.stringify(history));
  }, [history]);

  const getStatus = (val) => {
    const num = Number(val);
    if (num < 70) {
      return {
        text: "Past",
        color: "text-blue-700",
        bg: "bg-blue-100",
        border: "border-blue-200",
      };
    }
    if (num <= 140) {
      return {
        text: "Normal",
        color: "text-emerald-700",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
      };
    }
    return {
      text: "Yuqori",
      color: "text-red-700",
      bg: "bg-red-100",
      border: "border-red-200",
    };
  };

  const handleAdd = () => {
    const num = Number(value);

    if (!value.trim()) {
      setError("Iltimos, qand darajasini kiriting.");
      return;
    }

    if (Number.isNaN(num) || num <= 0) {
      setError("Iltimos, to‘g‘ri son kiriting.");
      return;
    }

    if (num > 600) {
      setError("Kiritilgan qiymat juda katta ko‘rinmoqda.");
      return;
    }

    const newData = {
      id: Date.now(),
      value: num,
      date: new Date().toLocaleString("uz-UZ"),
    };

    setHistory((prev) => [newData, ...prev]);
    setValue("");
    setError("");
  };

  const handleDelete = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  const stats = useMemo(() => {
    if (!history.length) {
      return {
        latest: "-",
        average: "-",
        total: 0,
      };
    }

    const values = history.map((item) => Number(item.value));
    const average = Math.round(
      values.reduce((sum, current) => sum + current, 0) / values.length
    );

    return {
      latest: history[0]?.value ?? "-",
      average,
      total: history.length,
    };
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
<button
  onClick={() => navigate(-1)}
  className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition font-medium"
>
  <FaArrowLeft />
  Ortga qaytish
</button>
        {/* Header */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-white/60 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                <FaHeartbeat />
                Qand monitoring tizimi
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Qand Nazorati
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
                Kunlik qand darajangizni yozib boring, holatingizni kuzating va
                o‘zgarishlarni tartibli ravishda nazorat qiling.
              </p>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center text-3xl shadow-lg">
              <FaTint />
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-2">Eng oxirgi ko‘rsatkich</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {stats.latest !== "-" ? `${stats.latest} mg/dL` : "-"}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-2">O‘rtacha ko‘rsatkich</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {stats.average !== "-" ? `${stats.average} mg/dL` : "-"}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-2">Jami yozuvlar</p>
            <h2 className="text-3xl font-bold text-gray-900">{stats.total}</h2>
          </div>
        </div>

        {/* Input section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Yangi ko‘rsatkich qo‘shish
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Masalan: 110"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              />
              {error && (
                <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>
              )}
            </div>

            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <FaPlus />
              Qo‘shish
            </button>
          </div>
        </div>

        {/* History section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Qand tarixi
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Barcha kiritilgan ko‘rsatkichlar shu yerda saqlanadi
              </p>
            </div>

            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 transition font-medium"
              >
                <FaTrash />
                Hammasini tozalash
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
              <div className="text-4xl mb-3">📉</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Hozircha ma’lumot yo‘q
              </h4>
              <p className="text-gray-500">
                Birinchi qand ko‘rsatkichingizni kiriting va monitoringni
                boshlang.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => {
                const status = getStatus(item.value);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center text-lg shadow">
                        <FaHeartbeat />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {item.value} mg/dL
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold border ${status.bg} ${status.color} ${status.border}`}
                          >
                            {status.text}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <FaCalendarAlt />
                          {item.date}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="self-start md:self-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
                    >
                      O‘chirish
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}