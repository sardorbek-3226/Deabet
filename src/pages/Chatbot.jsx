import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  FaUpload,
  FaPaperPlane,
  FaComments,
  FaHeartbeat,
  FaRobot,
  FaCamera,
  FaLeaf,
  FaTint,
  FaFire,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function ChatBotPage() {
  const [image, setImage] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [message, setMessage] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const imagePreview = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const getRandomNutrition = () => ({
    calories: Math.floor(Math.random() * 400) + 120,
    protein: (Math.random() * 20 + 6).toFixed(1),
    fat: (Math.random() * 14 + 3).toFixed(1),
    carbs: (Math.random() * 55 + 12).toFixed(1),
    sugarImpact: ["Past", "O‘rtacha", "Biroz yuqori"][
      Math.floor(Math.random() * 3)
    ],
  });

  const aiSuggestions = [
    "Bu ovqatni sabzavot bilan birga iste’mol qilish foydali bo‘ladi.",
    "Porsiyani biroz kichikroq qilish qand nazoratiga yordam beradi.",
    "Protein miqdorini ko‘paytirish mumkin.",
    "Suv ichishni unutmang, bu metabolizm uchun muhim.",
    "Shirinlik miqdorini me’yorda saqlash tavsiya etiladi.",
    "Agar diabet nazorati muhim bo‘lsa, uglevodlarni kuzatib boring.",
    "Ovqatdan keyin yengil yurish foydali bo‘lishi mumkin.",
  ];

  const quickQuestions = [
    "Qaysi ovqat foydaliroq?",
    "Bu ovqat diabet uchun mosmi?",
    "Kaloriyani kamaytirish uchun nima qilay?",
    "Protein ko‘paytirish uchun maslahat ber",
  ];

  const handleImageSubmit = () => {
    if (!image) return;

    if (nutrition && nutrition.imageName === image.name) return;

    const newNutrition = {
      ...getRandomNutrition(),
      imageName: image.name,
    };

    setNutrition(newNutrition);

    const adviceList = [
      {
        type: "ai",
        text: `Tahlil tayyor. Ushbu ovqat taxminan ${newNutrition.calories} kcal.`,
      },
      {
        type: "ai",
        text: `Protein: ${newNutrition.protein} g | Yog‘: ${newNutrition.fat} g | Uglevod: ${newNutrition.carbs} g`,
      },
      {
        type: "ai",
        text: `Qandga ta’siri: ${newNutrition.sugarImpact}`,
      },
      {
        type: "ai",
        text: "Maslahat: Ovqatni balanslash uchun ko‘proq sabzavot va me’yoriy porsiya tavsiya qilinadi.",
      },
    ];

    setAdvice((prev) => [...prev, ...adviceList]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMsg = message;

    setAdvice((prev) => [...prev, { type: "user", text: userMsg }]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const shuffled = [...aiSuggestions].sort(() => 0.5 - Math.random());
      const selectedReplies = shuffled.slice(
        0,
        Math.floor(Math.random() * 2) + 1
      );

      setAdvice((prev) => [
        ...prev,
        ...selectedReplies.map((msg) => ({
          type: "ai",
          text: msg,
        })),
      ]);

      setIsTyping(false);
    }, 900);
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [advice, isTyping]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto pt-24">
          {/* HERO */}
          <div className="mb-8">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#9810FA] via-purple-600 to-fuchsia-600 shadow-2xl relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-medium mb-4">
                      <FaRobot />
                      AI Oziqlanish Tahlili
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                      DiaCare bilan aqlli
                      <span className="block">ovqat tahlili va maslahat</span>
                    </h2>

                    <p className="mt-4 text-purple-50 max-w-2xl text-sm sm:text-base">
                      Ovqat rasmini yuklang, taxminiy ozuqaviy qiymatni ko‘ring va
                      AI yordamida sog‘lom tavsiyalar oling.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 min-w-[260px]">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                      <FaFire className="text-2xl mb-2" />
                      <p className="text-sm text-purple-100">Kaloriya nazorati</p>
                      <h3 className="font-bold text-lg">Smart Tahlil</h3>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                      <FaLeaf className="text-2xl mb-2" />
                      <p className="text-sm text-purple-100">Sog‘lom tavsiya</p>
                      <h3 className="font-bold text-lg">AI Yordam</h3>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                      <FaTint className="text-2xl mb-2" />
                      <p className="text-sm text-purple-100">Balanslangan ovqat</p>
                      <h3 className="font-bold text-lg">Diet Maslahati</h3>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                      <FaHeartbeat className="text-2xl mb-2" />
                      <p className="text-sm text-purple-100">DiaCare tizimi</p>
                      <h3 className="font-bold text-lg">Sog‘liq Nazorati</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* CHAT */}
            <div className="xl:col-span-7 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-fuchsia-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9810FA] to-purple-600 text-white flex items-center justify-center shadow-lg">
                    <FaRobot className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                      DiaCare AI Assistant
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Ovqat, kaloriya va sog‘lom ovqatlanish bo‘yicha yordamchi
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(item)}
                      className="px-3 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-medium hover:bg-purple-100 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-b from-slate-50 to-purple-50 rounded-3xl p-4 sm:p-5 h-[420px] overflow-y-auto space-y-3 border border-slate-100">
                  {advice.length === 0 && !isTyping ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                      <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                        <FaComments className="text-3xl text-purple-500" />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-600">
                        Suhbatni boshlang
                      </h4>
                      <p className="max-w-md text-sm mt-2">
                        Rasm yuklang yoki savol yozing. DiaCare AI sizga tezkor
                        tavsiyalar beradi.
                      </p>
                    </div>
                  ) : (
                    <>
                      {advice.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.type === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm sm:text-base shadow-sm ${
                              msg.type === "user"
                                ? "bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-br-md"
                                : "bg-white text-slate-700 border border-purple-100 rounded-bl-md"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white text-slate-700 border border-purple-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="mt-4 flex items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Savolingizni yozing..."
                    className="flex-1 border border-purple-100 bg-white rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base shadow-sm"
                  />

                  <button
                    onClick={handleSendMessage}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r from-[#9810FA] to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-purple-100 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9810FA] to-purple-600 text-white flex items-center justify-center shadow">
                    <FaCamera />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Ovqat rasmini yuklash
                    </h3>
                    <p className="text-sm text-slate-500">
                      AI orqali taxminiy tahlil va maslahat oling
                    </p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-purple-200 rounded-3xl p-6 bg-gradient-to-b from-purple-50 to-white text-center">
                  <label className="cursor-pointer flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9810FA] to-purple-600 text-white flex items-center justify-center shadow-lg">
                      <FaUpload className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">
                        {image ? "Rasm tanlandi" : "Rasm tanlash uchun bosing"}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        JPG, PNG va boshqa image fayllar
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  onClick={handleImageSubmit}
                  className="w-full mt-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#9810FA] to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-300"
                >
                  Ovqatni tekshirish
                </button>
              </div>

              {image && nutrition && (
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-purple-100 p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Tahlil natijasi
                  </h3>

                  <div className="overflow-hidden rounded-3xl shadow-md mb-5">
                    <img
                      src={imagePreview}
                      alt="Selected food"
                      className="w-full h-60 object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white p-4 border border-orange-100">
                      <p className="text-sm text-slate-500">Kaloriya</p>
                      <h4 className="text-2xl font-bold text-orange-600">
                        {nutrition.calories} kcal
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-white p-4 border border-violet-100">
                      <p className="text-sm text-slate-500">Protein</p>
                      <h4 className="text-2xl font-bold text-violet-600">
                        {nutrition.protein} g
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-white p-4 border border-pink-100">
                      <p className="text-sm text-slate-500">Yog‘</p>
                      <h4 className="text-2xl font-bold text-pink-600">
                        {nutrition.fat} g
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-white p-4 border border-purple-100">
                      <p className="text-sm text-slate-500">Uglevod</p>
                      <h4 className="text-2xl font-bold text-purple-600">
                        {nutrition.carbs} g
                      </h4>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">
                      AI xulosasi
                    </h4>
                    <p className="text-sm text-slate-600">
                      Ushbu ovqatning qandga ta’siri{" "}
                      <span className="font-bold text-purple-700">
                        {nutrition.sugarImpact}
                      </span>
                      . Ovqatni balanslash uchun oqsil, sabzavot va me’yoriy
                      porsiyani ushlash tavsiya qilinadi.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-[#9810FA] to-purple-600 rounded-3xl shadow-xl p-5 sm:p-6 text-white">
                <h3 className="text-xl font-bold mb-3">DiaCare foydasi</h3>
                <ul className="space-y-2 text-sm sm:text-base text-purple-50">
                  <li>• Ovqat rasmini yuklash orqali tezkor tahlil</li>
                  <li>• AI orqali sog‘lom tavsiyalar</li>
                  <li>• Qand nazorati uchun foydali maslahatlar</li>
                  <li>• Zamonaviy va responsive medical dizayn</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}