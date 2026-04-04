import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaDumbbell,
  FaCheckCircle,
  FaRunning,
  FaFireAlt,
  FaClock,
  FaRedo,
} from "react-icons/fa";

export default function FitnessPage() {
  const navigate = useNavigate();

  const defaultExercises = [
    {
      id: 1,
      title: "Yurish",
      duration: "30 min",
      difficulty: "Yengil",
      calories: 120,
      description: "Kun davomida tanani faollashtirish va qon aylanishini yaxshilash uchun.",
      done: false,
    },
    {
      id: 2,
      title: "Yengil yugurish",
      duration: "20 min",
      difficulty: "O‘rta",
      calories: 180,
      description: "Yurak faoliyatini qo‘llab-quvvatlaydi va chidamlilikni oshiradi.",
      done: false,
    },
    {
      id: 3,
      title: "Stretch mashqlar",
      duration: "15 min",
      difficulty: "Yengil",
      calories: 60,
      description: "Mushaklarni bo‘shashtiradi va tana egiluvchanligini oshiradi.",
      done: false,
    },
    {
      id: 4,
      title: "Squat mashqi",
      duration: "10 min",
      difficulty: "O‘rta",
      calories: 90,
      description: "Oyoq mushaklarini kuchaytiradi va tanani aktiv holatda ushlab turadi.",
      done: false,
    },
    {
      id: 5,
      title: "Nafas mashqlari",
      duration: "8 min",
      difficulty: "Yengil",
      calories: 30,
      description: "Stressni kamaytiradi va umumiy holatni yaxshilaydi.",
      done: false,
    },
  ];

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("fitness-exercises");
    return saved ? JSON.parse(saved) : defaultExercises;
  });

  useEffect(() => {
    localStorage.setItem("fitness-exercises", JSON.stringify(exercises));
  }, [exercises]);

  const toggleDone = (id) => {
    setExercises((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const resetProgress = () => {
    setExercises((prev) =>
      prev.map((item) => ({
        ...item,
        done: false,
      }))
    );
  };

  const stats = useMemo(() => {
    const total = exercises.length;
    const completed = exercises.filter((item) => item.done).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    const burnedCalories = exercises
      .filter((item) => item.done)
      .reduce((sum, item) => sum + item.calories, 0);

    return {
      total,
      completed,
      progress,
      burnedCalories,
    };
  }, [exercises]);

  const getDifficultyStyle = (difficulty) => {
    if (difficulty === "Yengil") {
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    }
    if (difficulty === "O‘rta") {
      return "bg-amber-100 text-amber-700 border border-amber-200";
    }
    return "bg-red-100 text-red-700 border border-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8">
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
        <div className="rounded-[30px] bg-white/90 backdrop-blur-md shadow-xl border border-white/70 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                <FaDumbbell />
                Kundalik jismoniy faollik
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Fitness Dashboard
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
                Har kun uchun moslashtirilgan mashqlarni bajaring, progressni
                kuzating va kunlik faol hayot tarzingizni nazorat qiling.
              </p>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-3xl shadow-lg">
              <FaRunning />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Jami mashqlar</p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.total}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Bajarilgan</p>
            <h2 className="text-3xl font-extrabold text-emerald-600">
              {stats.completed}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Progress</p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.progress}%
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Yoqilgan kaloriya</p>
            <h2 className="text-3xl font-extrabold text-orange-500">
              {stats.burnedCalories}
            </h2>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">
              Kunlik progress
            </h3>
            <span className="text-sm font-semibold text-emerald-600">
              {stats.progress}% bajarildi
            </span>
          </div>

          <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>

        {/* Exercise cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`rounded-[28px] p-6 shadow-md border transition hover:shadow-xl ${
                exercise.done
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {exercise.description}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-lg shadow">
                  <FaDumbbell />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-sm font-semibold border border-sky-100">
                  <FaClock />
                  {exercise.duration}
                </span>

                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getDifficultyStyle(
                    exercise.difficulty
                  )}`}
                >
                  <FaFireAlt />
                  {exercise.difficulty}
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold border border-orange-100">
                  🔥 {exercise.calories} kcal
                </span>
              </div>

              <button
                onClick={() => toggleDone(exercise.id)}
                className={`w-full py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                  exercise.done
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
              >
                <FaCheckCircle />
                {exercise.done ? "Bajarildi" : "Bajardim"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-[28px] p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              AI Fitness Insight
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Bugungi faoliyat natijalariga qaraganda sizning jismoniy
              aktivligingiz barqaror oshib bormoqda. Mashqlarni ketma-ket
              bajarish yurak faoliyati, qon aylanishi va umumiy energiyani
              yaxshilashga yordam beradi. Kunlik kamida 20–30 daqiqa faol harakat
              sog‘liq uchun foydali.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-emerald-950 text-white rounded-[28px] p-6 shadow-lg">
            <p className="text-sm text-emerald-200 mb-2">Smart Summary</p>
            <h3 className="text-2xl font-bold mb-3">
              {stats.completed}/{stats.total} mashq
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Siz bugun jami {stats.completed} ta mashqni bajardingiz va taxminan{" "}
              {stats.burnedCalories} kcal yoqdingiz.
            </p>

            <button
              onClick={resetProgress}
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-900 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              <FaRedo />
              Progressni tiklash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}