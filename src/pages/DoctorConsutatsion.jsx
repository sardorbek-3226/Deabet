import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaSearch, FaUserMd, FaCircle } from "react-icons/fa";

export default function DoctorConsultation() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    { id: 1, name: "Dr. Ali Valiyev", specialty: "Endokrinolog", experience: 10, rating: 4.9, status: "online", avatar: "./ALI.jpg" },
    { id: 2, name: "Dr. Malika Karimova", specialty: "Dietolog", experience: 8, rating: 4.8, status: "online", avatar: "./malika.jpg" },
    { id: 3, name: "Dr. Rustam Ahmedov", specialty: "Terapevt", experience: 12, rating: 5.0, status: "offline", avatar: "./jamshid.jpg" },
    { id: 4, name: "Dr. Dilorom Orifova", specialty: "Kardiolog", experience: 7, rating: 4.7, status: "online", avatar: "./azi.jpg" },
    { id: 5, name: "Dr. Jamshid Sodiqov", specialty: "Gastroenterolog", experience: 15, rating: 4.9, status: "offline", avatar: "./nodir.jpg" },
    { id: 6, name: "Dr. Nargiza Akromova", specialty: "Endokrinolog", experience: 9, rating: 4.6, status: "online", avatar: "./madi.jpg" },
    { id: 7, name: "Dr. Bekzod Umarov", specialty: "Psixolog", experience: 11, rating: 4.8, status: "online", avatar: "./jama.jpg" },
    { id: 8, name: "Dr. Laylo Shokirova", specialty: "Dietolog", experience: 6, rating: 4.5, status: "online", avatar: "./rayxon.jpg" },
    { id: 9, name: "Dr. Mahliyo G'aniyeva", specialty: "Nutrisiolog", experience: 14, rating: 4.9, status: "offline", avatar: "./mahliyo.jpg" },
  ];

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* Yuqori qism: Navigatsiya va Qidiruv */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <button
            onClick={() => navigate("/premium")}
            className="flex items-center w-fit gap-2 text-purple-600 font-bold hover:text-purple-800 transition"
          >
            <FaArrowLeft /> Tariflarga qaytish
          </button>
          
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ism yoki mutaxassislik bo'yicha qidirish..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">
            Tajribali <span className="text-purple-600">Mutaxassislar</span>
          </h1>
          <p className="text-gray-500 mt-2">Premium obuna doirasida malakali doktorlar bilan bog'laning.</p>
        </div>

        {/* Doktorlar Gridi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden border border-gray-100"
            >
              {/* Online/Offline Status */}
              <div className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                <FaCircle className={doc.status === "online" ? "text-green-500 animate-pulse" : "text-gray-300"} />
                <span className={doc.status === "online" ? "text-green-600" : "text-gray-400"}>
                  {doc.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-purple-50"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-1.5 rounded-lg shadow-md">
                    <FaUserMd size={14} />
                  </div>
                </div>
                
                <div>
                  <h2 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition">
                    {doc.name}
                  </h2>
                  <p className="text-purple-600 text-sm font-semibold">{doc.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
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

              <button
                onClick={() => navigate(`/doctorChat/${doc.id}`)}
                disabled={doc.status === "offline"}
                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  doc.status === "online" 
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-100" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {doc.status === "online" ? "Maslahat olish" : "Hozir band"}
              </button>
            </div>
          ))}
        </div>

        {/* Natija topilmasa */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <FaUserMd size={50} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600">Mutaxassis topilmadi</h3>
            <p className="text-gray-400">Qidiruv so'zini o'zgartirib ko'ring.</p>
          </div>
        )}
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm italic">
        * Maslahatlar faqat tavsiyaviy xarakterga ega. Favqulodda holatlarda 103 ga qo'ng'iroq qiling.
      </footer>
    </div>
  );
}