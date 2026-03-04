import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaStar, FaQuestionCircle, FaUserMd } from "react-icons/fa";

export default function PricingPlans() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      name: "Oddiy",
      price: "$0.0",
      period: "/ oy",
      description: "Yangi boshlovchilar uchun asosiy imkoniyatlar.",
      features: [
        "Sutkasiga 10 ta ChatBot xabari",
        "Asosiy ovqatlanish tavsiyalari",
        "Rasm yuklash (kunlik 2 ta)",
        "Hamjamiyat guruhlariga kirish",
      ],
      bg: "bg-white",
      text: "text-gray-800",
      button: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
      route: "/home",
      popular: false,
    },
    {
      name: "Premium",
      price: "$10.99",
      period: "/ oy",
      description: "Sog'lig'iga jiddiy e'tibor beruvchilar uchun.",
      features: [
        "Cheksiz ChatBot suhbatlari",
        "AI tomonidan shaxsiy dietalar",
        "Cheksiz rasm va analizlar tahlili",
        "Malakali doktorlar bilan 24/7 aloqa",
        "Reklamasiz interfeys",
      ],
      bg: "bg-gradient-to-br from-purple-600 to-indigo-700",
      text: "text-white",
      button: "bg-white text-purple-600 hover:bg-gray-100 shadow-lg",
      route: "/doctorConsultation",
      popular: true,
    },
  ];

  const faqs = [
    { q: "Premium tarifni istalgan vaqtda bekor qilsam bo'ladimi?", a: "Ha, istalgan vaqtda shaxsiy kabinetingiz orqali obunani to'xtatishingiz mumkin." },
    { q: "Doktorlar bilan qanday bog'lanaman?", a: "Premium obunachilar uchun maxsus 'Doktor bilan aloqa' bo'limi ochiladi va u yerda real vaqt rejimida chat qilish mumkin." },
  ];

  const handleSelectPlan = (plan) => {
    localStorage.setItem("selectedPlan", plan.name);
    navigate(plan.route);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Fon bezagi */}
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-600 clip-path-slant z-0 opacity-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Navigatsiya */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-purple-700 font-semibold hover:underline"
          >
            <FaArrowLeft /> Asosiy sahifaga qaytish
          </button>
          <div className="hidden md:block text-gray-500 italic">Xavfsiz to'lov tizimi 🔒</div>
        </div>

        {/* Sarlavha */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Sog'lig'ingiz uchun <span className="text-purple-600">to'g'ri investitsiya</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            O'zingizga mos tarifni tanlang va DiaNova yordamida hayotingizni yaxshilang.
          </p>
        </div>

        {/* Tarif Kartalari */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`${plan.bg} ${plan.text} relative flex flex-col p-10 rounded-[2.5rem] shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <FaStar /> TAVSIYA ETILADI
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className={`text-sm ${plan.name === "Premium" ? "text-purple-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="ml-2 opacity-70">{plan.period}</span>
              </div>

              <ul className="flex-1 mb-10 space-y-4">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-tight">
                    <FaCheckCircle className={plan.name === "Premium" ? "text-white mt-1" : "text-purple-600 mt-1"} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${plan.button}`}
              >
                {plan.name === "Premium" ? "Hozir boshlash" : "Bepul foydalanish"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Bo'limi */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-purple-600" /> Ko'p beriladigan savollar
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-5 font-semibold flex justify-between items-center hover:bg-gray-50"
                >
                  {faq.q}
                  <span>{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div className="p-5 bg-gray-50 text-gray-600 border-t">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Isbot (Social Proof) */}
        <div className="mt-20 p-8 bg-purple-50 rounded-3xl flex flex-col md:flex-row items-center gap-6 border border-purple-100">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-gray-700 font-medium text-center md:text-left">
            <span className="font-bold text-purple-600">1000+</span> dan ortiq foydalanuvchilar Premium tarifdan mamnun!
          </p>
          <div className="md:ml-auto flex items-center gap-2 text-yellow-500 font-bold">
            <FaStar /> 4.9/5.0 baho
          </div>
        </div>
      </div>
    </div>
  );
}