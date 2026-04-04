import React, { useState } from "react";
import {
  FaArrowLeft,
  FaFire,
  FaBolt,
  FaLeaf,
  FaRedo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function OvqatPage() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState("balance");
  const [plan, setPlan] = useState(null);

  const plans = {
    lose: [
      {
        meals: [
          { name: "Nonushta", food: "Yogurt + meva" },
          { name: "Tushlik", food: "Tovuq + salat" },
          { name: "Kechki ovqat", food: "Sho‘rva" },
        ],
        calories: 1400,
        protein: 90,
        carbs: 120,
        fat: 40,
      },
    ],
    gain: [
      {
        meals: [
          { name: "Nonushta", food: "Tuxum + non + banan" },
          { name: "Tushlik", food: "Guruch + go‘sht" },
          { name: "Kechki ovqat", food: "Kartoshka + baliq" },
        ],
        calories: 2600,
        protein: 140,
        carbs: 300,
        fat: 80,
      },
    ],
    balance: [
      {
        meals: [
          { name: "Nonushta", food: "Oatmeal + asal" },
          { name: "Tushlik", food: "Baliq + sabzavot" },
          { name: "Kechki ovqat", food: "Salat + yogurt" },
        ],
        calories: 1900,
        protein: 110,
        carbs: 200,
        fat: 60,
      },
    ],
  };

  const generatePlan = () => {
    const selected = plans[goal];
    const random = selected[Math.floor(Math.random() * selected.length)];
    setPlan(random);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <FaArrowLeft />
          Ortga
        </button>

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          AI Nutrition Planner ⚡
        </h1>

        {/* GOAL SELECT */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setGoal("lose")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              goal === "lose"
                ? "bg-red-500"
                : "bg-gray-800"
            }`}
          >
            <FaFire />
            Ozish
          </button>

          <button
            onClick={() => setGoal("gain")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              goal === "gain"
                ? "bg-green-500"
                : "bg-gray-800"
            }`}
          >
            <FaBolt />
            Vazn olish
          </button>

          <button
            onClick={() => setGoal("balance")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              goal === "balance"
                ? "bg-yellow-500"
                : "bg-gray-800"
            }`}
          >
            <FaLeaf />
            Balans
          </button>
        </div>

        {/* GENERATE */}
        <button
          onClick={generatePlan}
          className="w-full bg-white text-black py-3 rounded-xl font-bold mb-6 hover:scale-[1.02] transition"
        >
          Generate Plan 🚀
        </button>

        {/* RESULT */}
        {plan && (
          <div className="space-y-6">

            {/* CALORIES */}
            <div className="bg-gray-900 p-5 rounded-2xl">
              <h2 className="text-2xl font-bold">
                {plan.calories} kcal
              </h2>
            </div>

            {/* MACROS */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900 p-4 rounded-xl text-center">
                <p>Protein</p>
                <h3 className="font-bold">{plan.protein}g</h3>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl text-center">
                <p>Carbs</p>
                <h3 className="font-bold">{plan.carbs}g</h3>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl text-center">
                <p>Fat</p>
                <h3 className="font-bold">{plan.fat}g</h3>
              </div>
            </div>

            {/* MEALS */}
            <div className="space-y-4">
              {plan.meals.map((meal, i) => (
                <div
                  key={i}
                  className="bg-gray-900 p-5 rounded-2xl hover:bg-gray-800 transition"
                >
                  <h3 className="font-bold mb-1">
                    {meal.name}
                  </h3>
                  <p className="text-gray-400">
                    {meal.food}
                  </p>
                </div>
              ))}
            </div>

            {/* REGENERATE */}
            <button
              onClick={generatePlan}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-xl hover:bg-gray-700"
            >
              <FaRedo />
              Qayta generate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}