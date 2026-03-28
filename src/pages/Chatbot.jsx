import React, { useState, useRef, useEffect } from "react";
import { FaUpload, FaPaperPlane, FaAppleAlt, FaRobot } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../components/Navbar";

const GEN_AI_KEY = "AIzaSyBRbN0LsL4GrS2btwBVW13t5S7UFQnPbL4"; 
const genAI = new GoogleGenerativeAI(GEN_AI_KEY);

export default function ChatBot() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [chat, setChat] = useState([
    { sender: "ai", text: "Salom! Men sizning parhez bo'yicha yordamchingizman. Taom rasmini yuklang, men uni tahlil qilaman!" }
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Xabarlar qo'shilganda avtomatik pastga tushish
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  // 📸 Rasm tanlash
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🤖 Rasmni tahlil qilish (To'g'rilangan mantiq)
  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    
    // Foydalanuvchi xabarini qo'shish
    setChat(prev => [...prev, { sender: "user", text: "Rasm yuklandi. Iltimos, tahlil qiling." }]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result.split(",")[1];
          
          const result = await model.generateContent([
            {
              inlineData: {
                data: base64Data,
                mimeType: image.type
              }
            },
            { text: "Ushbu rasmdagi taomni aniqla. Taxminiy kaloriyasi, oqsillar, yog'lar va uglevodlar miqdorini o'zbek tilida qisqa va jadval ko'rinishida aytib ber." },
          ]);

          const response = await result.response;
          const text = response.text();
          
          setChat(prev => [...prev, { sender: "ai", text: text }]);
        } catch (err) {
          console.error("Ichki xatolik:", err);
          setChat(prev => [...prev, { sender: "ai", text: "Kechirasiz, rasmni qayta ishlashda xatolik bo'ldi. VPN yoqilganini tekshiring." }]);
        } finally {
          setLoading(false);
        }
      };
    } catch (error) {
      console.error("API xatosi:", error);
      setChat(prev => [...prev, { sender: "ai", text: "Xatolik yuz berdi. API kalit yoki internet ulanishini tekshiring." }]);
      setLoading(false);
    }
  };

  // 💬 Matnli xabar yuborish
  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;
    
    const userText = message;
    setMessage("");
    setChat(prev => [...prev, { sender: "user", text: userText }]);
    
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userText);
      const response = await result.response;
      setChat(prev => [...prev, { sender: "ai", text: response.text() }]);
    } catch (error) {
      setChat(prev => [...prev, { sender: "ai", text: "Kechirasiz, javob olishda muammo bo'ldi." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 px-4 pb-10 flex flex-col md:flex-row gap-6 h-[90vh]">
        
        {/* CHAT SECTION */}
        <div className="flex-[2] bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-purple-50/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
              <FaRobot size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">DiaCare AI Assistant</h2>
              <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Onlayn
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {chat.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm whitespace-pre-wrap ${
                  msg.sender === "user" 
                  ? "bg-purple-600 text-white rounded-tr-none" 
                  : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Sog'lom ovqatlanish haqida so'rang..."
              className="flex-1 bg-gray-100 border-none rounded-2xl p-3 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <button 
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-purple-600 text-white p-4 rounded-2xl hover:bg-purple-700 transition shadow-lg disabled:bg-gray-400"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* UPLOAD SECTION */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 text-center">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Rasm orqali tahlil</h3>
            <div className="relative group">
              <input 
                type="file" 
                id="food-upload" 
                hidden 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              <label 
                htmlFor="food-upload"
                className="block w-full py-10 border-2 border-dashed border-purple-200 rounded-2xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl px-2" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FaUpload size={30} />
                    <span className="text-sm">Rasm yuklash uchun bosing</span>
                  </div>
                )}
              </label>
            </div>
            
            <button
              disabled={!image || loading}
              onClick={analyzeImage}
              className={`w-full mt-4 py-3 rounded-2xl font-bold transition shadow-lg ${
                !image || loading 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 active:scale-95"
              }`}
            >
              {loading ? "Tahlil qilinmoqda..." : "Kaloriyani aniqlash"}
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-3xl shadow-xl text-white">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <FaAppleAlt /> Eslatma
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              AI natijalari taxminiy. Aniq ma'lumot uchun mahsulot qadog'ini ko'ring yoki mutaxassis bilan maslahatlashing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}