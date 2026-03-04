import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaImage, FaMicrophone, FaEllipsisV, FaInfoCircle, FaVideo, FaPhoneAlt, FaTimes } from "react-icons/fa";

export default function DoctorChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false); // Qo'ng'iroq holati
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalomu alaykum! Men doktor Ali bo'laman. Sizga qanday yordam bera olaman?", sender: "doctor", time: "10:00" }
  ]);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans relative overflow-hidden">
      
      {/* --- Video Qo'ng'iroq Interfeysi (Modal kabi) --- */}
      {isCalling && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-between py-20 text-white">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full border-4 border-purple-500 p-1 mx-auto mb-6 overflow-hidden animate-pulse">
              <img src="/ALI.jpg" className="w-full h-full rounded-full object-cover" alt="Doctor" />
            </div>
            <h2 className="text-2xl font-bold italic">Dr. Ali Valiyev</h2>
            <p className="text-gray-400 mt-2">Bog'lanilmoqda...</p>
          </div>

          <div className="flex gap-8">
            <button 
              onClick={() => setIsCalling(false)}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl hover:bg-red-700 transition shadow-lg shadow-red-900/40"
            >
              <FaTimes />
            </button>
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl animate-bounce">
              <FaVideo />
            </div>
          </div>
        </div>
      )}

      {/* --- Header --- */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/doctorConsultation")} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <FaArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/ALI.jpg" className="w-10 h-10 rounded-full object-cover border" alt="Doc" />
            <div>
              <h1 className="font-bold text-gray-800 text-sm md:text-base leading-none">Dr. Ali Valiyev</h1>
              <span className="text-[10px] text-green-600 font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Video va Audio Qo'ng'iroq Tugmalari */}
        <div className="flex items-center gap-1 md:gap-3">
          <button 
            onClick={() => setIsCalling(true)}
            className="p-3 text-purple-600 hover:bg-purple-50 rounded-full transition"
            title="Video qo'ng'iroq"
          >
            <FaVideo size={20} />
          </button>
          <button 
            onClick={() => setIsCalling(true)}
            className="p-3 text-purple-600 hover:bg-purple-50 rounded-full transition"
            title="Ovozli qo'ng'iroq"
          >
            <FaPhoneAlt size={18} />
          </button>
          <button className="hidden sm:block p-3 text-gray-400 hover:text-purple-600 transition">
            <FaInfoCircle size={20} />
          </button>
        </div>
      </header>

      {/* --- Chat Body --- */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
              msg.sender === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
            }`}>
              <p className="text-sm">{msg.text}</p>
              <span className="text-[9px] mt-1 block opacity-60 text-right">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </main>

      {/* --- Footer (Input) --- */}
      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-2 md:gap-4">
          <button type="button" className="p-2 text-gray-400 hover:text-purple-600"><FaImage size={22} /></button>
          <input
            type="text"
            placeholder="Xabar yozing..."
            className="flex-1 bg-gray-100 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="p-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 shadow-md">
            <FaPaperPlane size={18} />
          </button>
        </form>
      </footer>
    </div>
  );
}