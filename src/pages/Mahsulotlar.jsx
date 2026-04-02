import React, { useState, useEffect } from "react";
import { FaAppleAlt, FaSearch, FaWeightHanging, FaFireAlt, FaFilter } from "react-icons/fa";
import Navbar from "../components/Navbar";

// --- Mahsulotlar Ma'lumotlari (O'zgarishsiz qoldi) ---
const categories = {
  dukkaklik: [
    { name: "Quritilgan loviya, noʻxat, mosh", nb: "1 osh qoshiq", weight: "20 g", icon: "🫘" },
    { name: "Qaynatilgan dukkaklilar", nb: "3 osh qoshiq", weight: "50 g", icon: "🍲" },
    { name: "Pishirilgan kartoshka (po'stisiz)", nb: "1 dona (tuxumdek)", weight: "75 g", icon: "🥔" },
    { name: "Kartoshka pyuresi", nb: "2 osh qoshiq", weight: "75 g", icon: "🥣" },
    { name: "Qovurilgan kartoshka", nb: "1.5–2 osh qoshiq", weight: "35 g", icon: "🍳" },
    { name: "Kartoshka Fri", nb: "12 bo‘lak", weight: "35 g", icon: "🍟" },
    { name: "Kartoshkali chips", nb: "1 kichik o‘ram", weight: "25 g", icon: "🥨" },
    { name: "Jo‘xori (so‘tasi)", nb: "0.5 dona", weight: "100 g", icon: "🌽" },
    { name: "Konservalangan jo‘xori", nb: "3 osh qoshiq", weight: "70 g", icon: "🥫" },
    { name: "Jo‘xori bodrogi (Popkorn)", nb: "4 osh qoshiq", weight: "15 g", icon: "🍿" },
    { name: "Sabzi", nb: "3 ta katta sabzi", weight: "400 g", icon: "🥕" },
    { name: "Lavlagi", nb: "2 ta katta lavlagi", weight: "400 g", icon: "🥗" },
    { name: "Qaynatilgan chechevitsa (yashil)", nb: "2 osh qoshiq", weight: "50 g", icon: "🍲" },
    { name: "Qovoq (pishgan)", nb: "1 bo'lak", weight: "200 g", icon: "🎃" },
    { name: "Soya (quritilgan)", nb: "4 osh qoshiq", weight: "45 g", icon: "🌱" },
  ],
  nonlik: [
    { name: "Oddiy non (Oq)", nb: "1 bo‘lak", weight: "25-30 g", icon: "🍞" },
    { name: "Qora non (Javdar)", nb: "1 bo‘lak", weight: "30 g", icon: "🍞" },
    { name: "Kepakli non", nb: "1 bo‘lak", weight: "25 g", icon: "🌾" },
    { name: "Suxari (Quritilgan non)", nb: "2 dona", weight: "20 g", icon: "🥖" },
    { name: "Kreker (shirin bo'lmagan)", nb: "5-6 dona", weight: "20 g", icon: "🍪" },
    { name: "Chuchvara (tayyor pishgan)", nb: "4-5 dona", weight: "50 g", icon: "🥟" },
    { name: "Manti (o'rtacha)", nb: "1 dona", weight: "50 g", icon: "🥟" },
    { name: "Somsa (kichik xamirli)", nb: "0.5 dona", weight: "40 g", icon: "🥐" },
    { name: "Un (har qanday navli)", nb: "1 osh qoshiq", weight: "15 g", icon: "🥡" },
    { name: "Guruch (pishirilgan)", nb: "2 osh qoshiq", weight: "50 g", icon: "🍚" },
    { name: "Grechka (pishirilgan)", nb: "2 osh qoshiq", weight: "50 g", icon: "🥣" },
    { name: "Makaron (pishirilgan)", nb: "3 osh qoshiq", weight: "50 g", icon: "🍝" },
    { name: "Manna yormasi (pishgan)", nb: "2 osh qoshiq", weight: "50 g", icon: "🥣" },
    { name: "Suli yormasi (Ovsyanika)", nb: "2 osh qoshiq", weight: "50 g", icon: "🥣" },
  ],
  mevaSabzavot: [
    { name: "Olma (o'rtacha)", nb: "1 dona", weight: "100 g", icon: "🍎" },
    { name: "Banan (po'stisiz)", nb: "0.5 dona", weight: "70 g", icon: "🍌" },
    { name: "O'rik (Aprikos)", nb: "2-3 dona", weight: "110 g", icon: "🍑" },
    { name: "Behi (o'rtacha)", nb: "1 dona", weight: "140 g", icon: "🍏" },
    { name: "Olcha / Gilos", nb: "10-12 dona", weight: "100 g", icon: "🍒" },
    { name: "Apelsin", nb: "1 dona", weight: "150 g", icon: "🍊" },
    { name: "Mandarin", nb: "2-3 dona", weight: "150 g", icon: "🍊" },
    { name: "Tarvuz", nb: "1 katta bo‘lak", weight: "250 g", icon: "🍉" },
    { name: "Qovun", nb: "1 o'rtacha bo‘lak", weight: "150 g", icon: "🍈" },
    { name: "Uzum", nb: "10-12 dona", weight: "70 g", icon: "🍇" },
    { name: "Nok (o'rtacha)", nb: "1 dona", weight: "100 g", icon: "🍐" },
    { name: "Kivi", nb: "1 dona", weight: "110 g", icon: "🥝" },
    { name: "Anor", nb: "0.5 dona", weight: "150 g", icon: "🍎" },
    { name: "Anjir (yangi)", nb: "1 dona", weight: "80 g", icon: "🫐" },
    { name: "Qulupnay", nb: "10-12 dona", weight: "150 g", icon: "🍓" },
    { name: "Shaftoli", nb: "1 dona", weight: "120 g", icon: "🍑" },
  ],
  quritilgan: [
    { name: "Mayiz", nb: "1 osh qoshiq", weight: "20 g", icon: "🍇" },
    { name: "Turshak (Quritilgan o'rik)", nb: "3 dona", weight: "20 g", icon: "🍑" },
    { name: "Xurmo qoqi (Finiq)", nb: "2 dona", weight: "20 g", icon: "🌴" },
    { name: "Anjir qoqi", nb: "1 dona", weight: "20 g", icon: "🛖" },
    { name: "Olxo'ri qoqi", nb: "3 dona", weight: "25 g", icon: "🟣" },
    { name: "Yong'oq mag'zi", nb: "30-40 g", weight: "40 g", icon: "🥜" },
    { name: "Bodom", nb: "20-25 dona", weight: "30 g", icon: "🌰" },
    { name: "Pista (Handon)", nb: "1 hovuch", weight: "30 g", icon: "🥜" },
    { name: "Yer yong'oq", nb: "1 hovuch", weight: "30 g", icon: "🥜" },
  ],
  shirinlik: [
    { name: "Shakar (qum shakar)", nb: "1 osh qoshiq", weight: "12 g", calories: "48", icon: "🍭" },
    { name: "Raffinad shakar", nb: "2 bo'lak", weight: "10 g", calories: "40", icon: "🧊" },
    { name: "Asal", nb: "1 choy qoshiq", weight: "12 g", calories: "35", icon: "🍯" },
    { name: "Shokolad (achchiq)", nb: "2 bo'lak (20g)", weight: "20 g", calories: "110", icon: "🍫" },
    { name: "Sutli shokolad", nb: "1.5 bo'lak", weight: "15 g", calories: "85", icon: "🍫" },
    { name: "Muzqaymoq (plombir)", nb: "1 dona (kichik)", weight: "60 g", calories: "150", icon: "🍦" },
    { name: "Gazlangan ichimlik (Cola/Pepsi)", nb: "100 ml", weight: "-", calories: "42", icon: "🥤" },
    { name: "Meva sharbati (tabiiy)", nb: "100 ml", weight: "-", calories: "45", icon: "🧃" },
    { name: "Vafli", nb: "1 dona", weight: "20 g", calories: "100", icon: "🧇" },
    { name: "Pechene (oddiy)", nb: "2 dona", weight: "20 g", calories: "90", icon: "🍪" },
    { name: "Kisel / Kompot (shakarli)", nb: "1 stakan", weight: "-", calories: "100", icon: "🍹" },
  ],
};
const categoryLabels = {
  all: "Hammasi",
  dukkaklik: "Dukkakliklar",
  nonlik: "Nonlar",
  mevaSabzavot: "Mevalar",
  quritilgan: "Quritilganlar",
  shirinlik: "Shirinliklar",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Har bir bo'limni chizish funksiyasi
  const renderSection = (id, title, items) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) return null;
    if (activeTab !== "all" && activeTab !== id) return null;

    return (
      <div key={id} className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group relative overflow-hidden"
            >
              {/* Orqa fon uchun dekorativ nur */}
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-50 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  {item.icon || "🥗"}
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                  {item.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-2 rounded-xl bg-slate-50 border border-slate-50 group-hover:border-purple-100 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 text-purple-600">
                      <FaAppleAlt size={14} />
                    </span>
                    <span className="text-sm font-bold text-slate-600">{item.nb}</span>
                  </div>
                  
                  {item.weight && item.weight !== "-" && (
                    <div className="flex items-center p-2 rounded-xl bg-slate-50 border border-slate-50 group-hover:border-blue-100 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 text-blue-500">
                        <FaWeightHanging size={14} />
                      </span>
                      <span className="text-sm text-slate-500 font-medium">Vazni: <b className="text-slate-700">{item.weight}</b></span>
                    </div>
                  )}

                  {item.calories && item.calories !== "-" && (
                    <div className="flex items-center p-2 rounded-xl bg-slate-50 border border-slate-50 group-hover:border-orange-100 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 text-orange-500">
                        <FaFireAlt size={14} />
                      </span>
                      <span className="text-sm text-slate-500 font-medium">Energiya: <b className="text-slate-700">{item.calories} kkal</b></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Navbar />
      
      {/* pt-28 orqali Navbar tagiga kirib ketishini to'g'irlaymiz */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        
        {/* Yuqori qism: Sarlavha va Qidiruv */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
          <div className="animate-in slide-in-from-left duration-700">
            <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-xs font-black uppercase tracking-widest">Katalog</span>
            <h1 className="text-5xl font-black text-slate-900 mt-3 mb-2 tracking-tighter">Mahsulotlar</h1>
            <p className="text-slate-500 text-lg">Sog'lom turmush tarzi uchun mahsulotlar me'yori (1 non birligi bo'yicha)</p>
          </div>
          
          <div className="relative group w-full lg:w-96 animate-in slide-in-from-right duration-700">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            <input
              type="text"
              placeholder="Mahsulotlarni qidirish..."
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-transparent shadow-xl shadow-slate-200/50 rounded-2xl focus:border-purple-500 transition-all outline-none font-medium text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Kategoriyalar Filteri (Chips) */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar animate-in fade-in duration-1000">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
            <FaFilter size={14} />
          </div>
          {Object.keys(categoryLabels).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-xl text-sm font-black whitespace-nowrap transition-all duration-300 ${
                activeTab === key 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-200 -translate-y-1" 
                : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>

        {/* Kontent */}
        <div className="mt-8">
          {renderSection("dukkaklik", "🌾 Dukkakliklar va Sabzavotlar", categories.dukkaklik)}
          {renderSection("nonlik", "🍞 Non va Xamirli Mahsulotlar", categories.nonlik)}
          {renderSection("mevaSabzavot", "🍎 Sarhil Mevalar", categories.mevaSabzavot)}
          {renderSection("quritilgan", "🥜 Quritilgan Mevalar va Yong'oqlar", categories.quritilgan)}
          {renderSection("shirinlik", "🍰 Shirinliklar va Ichimliklar", categories.shirinlik)}
        </div>

        {/* Bo'sh holat */}
        {Object.values(categories).every(cat => 
          cat.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).length === 0
        ) && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <FaSearch size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Hech narsa topilmadi</h3>
            <p className="text-slate-500 mt-2">Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang</p>
          </div>
        )}
      </div>

      <footer className="text-center py-12 text-slate-400 text-sm font-medium border-t border-slate-100 bg-white mt-10">
        &copy; 2026 <span className="text-purple-600 font-bold">DiaCare</span> - Sog'liqni saqlash platformasi
      </footer>
    </div>
  );
}