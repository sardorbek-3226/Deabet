import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // localStorage dan tanlangan plan va user ma'lumotlarini olish
  useEffect(() => {
    const plan = localStorage.getItem("selectedPlan") || "Premium";
    setSelectedPlan(plan);

    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) setUserData(savedData);

    if (!plan) navigate("/home");
  }, [navigate]);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      toast.success(
        `To'lov muvaffaqiyatli amalga oshirildi! Sizning plandingiz: ${selectedPlan}`
      );
      setLoading(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 font-sans">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Back button */}
      <button
        onClick={() => navigate("/premium")}
        className="self-start mb-6 flex items-center gap-2 text-purple-600 font-semibold hover:underline text-sm sm:text-base"
      >
        <FaArrowLeft /> Tariflar sahifasiga qaytish
      </button>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Left side: Plan summary */}
        <div className="flex flex-col justify-center bg-purple-50 p-4 sm:p-6 rounded-2xl shadow-inner">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-purple-700">Siz tanlagan plan:</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{selectedPlan}</h3>
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">$10.99 / oy</p>
          <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
            <li>✔ Cheksiz ChatBot suhbatlari</li>
            <li>✔ AI tomonidan shaxsiy dietalar</li>
            <li>✔ Cheksiz rasm va analizlar tahlili</li>
            <li>✔ Malakali doktorlar bilan 24/7 aloqa</li>
            <li>✔ Reklamasiz interfeys</li>
          </ul>
        </div>

        {/* Right side: Payment form */}
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">To‘lov ma’lumotlari</h2>

          {/* Full Name */}
          <div className="relative mb-3 sm:mb-4">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Ism Familiya"
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Card Number */}
          <div className="relative mb-3 sm:mb-4">
            <FaCreditCard className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              value={userData.cardNumber}
              onChange={(e) => setUserData({ ...userData, cardNumber: e.target.value })}
              className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Expiry + CVC */}
          <div className="flex gap-3 mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="MM/YY"
              value={userData.expiry}
              onChange={(e) => setUserData({ ...userData, expiry: e.target.value })}
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="CVC"
              value={userData.cvc}
              onChange={(e) => setUserData({ ...userData, cvc: e.target.value })}
              className="w-24 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Payment button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl text-white bg-gradient-to-br from-purple-600 to-indigo-700 hover:opacity-90 shadow-lg flex items-center justify-center gap-2 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "To‘lov amalga oshirilmoqda..." : <><FaCreditCard /> To‘lovni amalga oshirish</>}
          </button>

          <p className="text-gray-500 text-xs sm:text-sm text-center mt-3 sm:mt-4">
            Xavfsiz to‘lov 🔒 Stripe / PayPal integratsiya mumkin
          </p>
        </div>
      </div>
    </div>
  );
}