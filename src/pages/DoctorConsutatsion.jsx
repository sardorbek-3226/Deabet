import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaUserMd, FaCircle, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorConsultation() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState({}); // {docId: time}
  const [lockedTimes, setLockedTimes] = useState({}); // tanlangan vaqti lock qilinadi

  const doctors = [
    { id: 1, name: "Dr. Ali Valiyev", specialty: "Endokrinolog", experience: 10, rating: 4.9, status: "online", avatar: "./ALI.jpg" },
    { id: 2, name: "Dr. Malika Karimova", specialty: "Dietolog", experience: 8, rating: 4.8, status: "online", avatar: "./malika.jpg" },
    { id: 3, name: "Dr. Rustam Ahmedov", specialty: "Terapevt", experience: 12, rating: 5.0, status: "online", avatar: "./jamshid.jpg" },
    { id: 4, name: "Dr. Dilorom Orifova", specialty: "Kardiolog", experience: 7, rating: 4.7, status: "online", avatar: "./azi.jpg" },
    { id: 5, name: "Dr. Jamshid Sodiqov", specialty: "Gastroenterolog", experience: 15, rating: 4.9, status: "online", avatar: "./nodir.jpg" },
    { id: 6, name: "Dr. Nargiza Akromova", specialty: "Endokrinolog", experience: 9, rating: 4.6, status: "online", avatar: "./madi.jpg" },
    { id: 7, name: "Dr. Bekzod Umarov", specialty: "Psixolog", experience: 11, rating: 4.8, status: "online", avatar: "./jama.jpg" },
    { id: 8, name: "Dr. Laylo Shokirova", specialty: "Dietolog", experience: 6, rating: 4.5, status: "online", avatar: "./rayxon.jpg" },
    { id: 9, name: "Dr. Mahliyo G'aniyeva", specialty: "Nutrisiolog", experience: 14, rating: 4.9, status: "online", avatar: "./mahliyo.jpg" },
  ];
  
  

  // sahifa yuklanganda localStorage dan yuklash
  useEffect(() => {
    const savedTimes = JSON.parse(localStorage.getItem("doctorTimes") || "{}");
    setSelectedTime(savedTimes);

    const savedLocked = JSON.parse(localStorage.getItem("lockedTimes") || "{}");
    setLockedTimes(savedLocked);
  }, []);

  // vaqt tanlash
  const handleTimeChange = (docId, value) => {
    if (lockedTimes[docId]) {
      toast.info("Siz allaqachon vaqtni tanlagansiz, o'zgartira olmaysiz!");
      return;
    }
    const updated = { ...selectedTime, [docId]: value };
    setSelectedTime(updated);
    localStorage.setItem("doctorTimes", JSON.stringify(updated));
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const timeOptions = [];
  for (let h = 8; h <= 20; h++) {
    const hourStr = h.toString().padStart(2, "0") + ":00";
    timeOptions.push(hourStr);
  }

  const handleConsultation = (docId) => {
    const chosenTime = selectedTime[docId];
    if (!chosenTime) {
      toast.error("Iltimos, vaqtni tanlang!");
      return;
    }

    const now = new Date();
    const [hours, minutes] = chosenTime.split(":").map(Number);
    const chosenDate = new Date();
    chosenDate.setHours(hours, minutes, 0, 0);

    const diffMinutes = (now - chosenDate) / 60000;

    if (diffMinutes < -30) {
      toast.info("Siz tanlagan vaqt hali kelmadi. Kuting ⏳");
      return;
    } else if (diffMinutes > 60) {
      toast.error("Ushbu maslahat muddati o'tib ketdi 😔");
      return;
    }

    // bir marta tanlagan vaqti lock qilish
    const updatedLocked = { ...lockedTimes, [docId]: true };
    setLockedTimes(updatedLocked);
    localStorage.setItem("lockedTimes", JSON.stringify(updatedLocked));

    navigate(`/doctorChat/${docId}?time=${chosenTime}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      {/* Yuqori qism */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center w-fit gap-2 text-purple-600 font-bold hover:text-purple-800 transition"
        >
          <FaArrowLeft /> Asosiy sahifaga qaytish
        </button>
        <input
          type="text"
          placeholder="Ism yoki mutaxassislik bo'yicha qidirish..."
          className="w-full md:w-96 pl-4 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doktorlar */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden border border-gray-100">
            
            {/* Status */}
            <div className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
              <FaCircle className="text-green-500 animate-pulse" />
              <span className="text-green-600">online</span>
            </div>

            {/* Info */}
            <div className="flex items-center gap-4 mb-6">
              <img src={doc.avatar} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-purple-50" />
              <div>
                <h2 className="font-bold text-xl text-gray-800">{doc.name}</h2>
                <p className="text-purple-600 text-sm font-semibold">{doc.specialty}</p>
              </div>
            </div>

            {/* Tajriba / Reyting */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Tajriba</p>
                <p className="font-bold text-gray-700">{doc.experience} yil</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Reyting</p>
                <p className="font-bold text-gray-700 flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-400" size={12} /> {doc.rating}
                </p>
              </div>
            </div>

            {/* Time picker */}
            <select
  className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
  value={selectedTime[doc.id] || ""}
  disabled={lockedTimes[doc.id] || selectedTime[doc.id]} // agar bir marta tanlangan bo‘lsa ham disabled
  onChange={(e) => handleTimeChange(doc.id, e.target.value)}
>
  <option value="">Vaqtni tanlang</option>
  {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
</select>
            {/* Maslahat olish */}
            <button
              onClick={() => handleConsultation(doc.id)}
              className="w-full py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
            >
              <FaClock /> Maslahat olish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}