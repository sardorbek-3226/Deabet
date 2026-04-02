import React, { useState, useEffect } from "react";
import { 
  FaHeartbeat, FaAppleAlt, FaChartLine, 
  FaPlus, FaCalendarCheck, FaTimes, FaCheckCircle, 
  FaRunning, FaGlassWhiskey, FaCapsules, FaBed, FaWalking
} from "react-icons/fa";
import Navbar from "../components/Navbar";

// Ikonkalarni ID bo'yicha render qilish uchun yordamchi obyekt
const iconMap = {
  1: <FaHeartbeat />, 2: <FaCapsules />, 3: <FaAppleAlt />,
  4: <FaWalking />, 5: <FaGlassWhiskey />, 6: <FaHeartbeat />,
  7: <FaRunning />, 8: <FaGlassWhiskey />, 9: <FaAppleAlt />,
  10: <FaHeartbeat />, 11: <FaBed />
};

export default function Dashboard() {
  // --- INITIAL LOAD ---
  const getInitialMissions = () => {
    const saved = localStorage.getItem("missions_v3");
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 1, task: "Tonggi qand o'lchovi", time: "07:30", done: false },
      { id: 2, task: "Dorilarni qabul qilish", time: "08:00", done: false },
      { id: 3, task: "Nonushta (Kam uglevodli)", time: "08:30", done: false },
      { id: 4, task: "Ertalabki yengil mashq", time: "09:00", done: false },
      { id: 5, task: "1-stakan suv", time: "10:00", done: false },
      { id: 6, task: "Tushlikdan oldin o'lchov", time: "13:00", done: false },
      { id: 7, task: "Tushlikdan so'ng piyoda yurish", time: "14:30", done: false },
      { id: 8, task: "2-stakan suv", time: "15:30", done: false },
      { id: 9, task: "Kechki ovqat nazorati", time: "19:00", done: false },
      { id: 10, task: "Uyqudan oldin o'lchov", time: "22:00", done: false },
      { id: 11, task: "Sog'lom uyqu (8 soat)", time: "23:00", done: false },
    ];
  };

  const [sugarLevel, setSugarLevel] = useState(localStorage.getItem("sugarLevel") || 110);
  const [calories, setCalories] = useState(localStorage.getItem("calories") || 0);
  const [missions, setMissions] = useState(getInitialMissions());
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [inputValue, setInputValue] = useState("");

  // --- SAQLASH (Endi xato bermaydi) ---
  useEffect(() => {
    // Faqat oddiy ma'lumotlarni saqlaymiz (ikonkalarsiz)
    localStorage.setItem("missions_v3", JSON.stringify(missions));
    localStorage.setItem("sugarLevel", sugarLevel);
    localStorage.setItem("calories", calories);
  }, [missions, sugarLevel, calories]);

  const handleUpdate = () => {
    if (inputValue && !isNaN(inputValue)) {
      if (modalType === "sugar") setSugarLevel(inputValue);
      if (modalType === "calorie") setCalories(Number(calories) + Number(inputValue));
      setIsModalOpen(false);
      setInputValue("");
    }
  };

  const toggleMission = (id) => {
    setMissions(missions.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const stats = [
    { title: "Qon Shakari", value: sugarLevel, unit: "mg/dL", icon: <FaHeartbeat />, color: "bg-rose-500" },
    { title: "Jami Kaloriya", value: calories, unit: "kcal", icon: <FaAppleAlt />, color: "bg-orange-500" },
    { title: "Faollik", value: "6,200", unit: "qadam", icon: <FaChartLine />, color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-900 pb-20 mt-20">
      {/* <Navbar /> */}
      <Navbar/>
      <main className="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
        
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
              Sizning <span className="text-purple-600 underline decoration-pink-300 underline-offset-8">Kunlik</span> Monitoringingiz
            </h1>
          </div>
          <div className="flex gap-4">
             <button onClick={() => {setModalType("sugar"); setIsModalOpen(true);}} className="flex-1 py-4 bg-purple-600 text-white rounded-[2rem] font-bold shadow-lg hover:bg-purple-700 transition active:scale-95 flex flex-col items-center gap-2">
                <FaHeartbeat /> <span className="text-xs font-black uppercase">Qand</span>
             </button>
             <button onClick={() => {setModalType("calorie"); setIsModalOpen(true);}} className="flex-1 py-4 bg-orange-500 text-white rounded-[2rem] font-bold shadow-lg hover:bg-orange-600 transition active:scale-95 flex flex-col items-center gap-2">
                <FaAppleAlt /> <span className="text-xs font-black uppercase">Kaloriya</span>
             </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}>
                {item.icon}
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">{item.title}</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-black text-slate-800">{item.value}</h2>
                <span className="text-slate-400 font-bold">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Missions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                Missiyalar 
                <span className="text-sm font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                    {missions.filter(m => m.done).length}/{missions.length}
                </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {missions.map((m) => (
                <div 
                  key={m.id} 
                  onClick={() => toggleMission(m.id)}
                  className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center gap-4 ${m.done ? 'bg-emerald-50 border-emerald-100 shadow-inner' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                >
                  <div className={`text-xl ${m.done ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {m.done ? <FaCheckCircle /> : iconMap[m.id]}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${m.done ? 'text-emerald-700 opacity-50' : 'text-slate-700'}`}>{m.task}</p>
                    <span className="text-[10px] font-bold text-slate-300">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="lg:col-span-2 bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-center text-center sticky top-24 h-fit">
             <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="text-indigo-400 opacity-30" stroke="currentColor" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" className="text-white transition-all duration-1000" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(missions.filter(m => m.done).length / missions.length) * 100}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-3xl">
                  {Math.round((missions.filter(m => m.done).length / missions.length) * 100)}%
                </div>
             </div>
             <h3 className="font-bold text-xl mb-2 text-white">Umumiy natija</h3>
             <p className="text-indigo-100 text-sm italic opacity-80">Bugungi rejani yakunlashga oz qoldi!</p>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative z-10 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">
              {modalType === "sugar" ? "Qand o'lchovi" : "Kaloriya kiritish"}
            </h3>
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={modalType === "sugar" ? "mg/dL birligida" : "kcal birligida"}
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-purple-500 transition-all font-bold text-lg mb-6 shadow-inner"
              autoFocus
            />
            <button onClick={handleUpdate} className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black shadow-lg hover:bg-purple-700 transition transform active:scale-95 text-white">
              SAQLASH
            </button>
          </div>
        </div>
      )}
    </div>
  );
}