import React, { useState } from "react";
import { FaAppleAlt, FaBars, FaComments, FaHome, FaTimes, FaVideo, FaSearch, FaWeightHanging, FaFireAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
// --- Mahsulotlar Ma'lumotlari ---
const categories = {
  dukkaklik: [
    { name: "Quritilgan dukkaklilar (loviya, noʻxat, mosh)", nb: "1 osh qoshiq", weight: "20 g" },
    { name: "Gaynatilgan dukkaklilar", nb: "3 osh qoshiq", weight: "50 g" },
    { name: "Poʻstisiz pishirilgan kartoshka", nb: "1 dona", weight: "75 g" },
    { name: "Xom yoki pishirilgan kartoshka", nb: "1 dona", weight: "65 g" },
    { name: "Kartoshka pyuresi", nb: "2 osh qoshiq", weight: "75 g" },
    { name: "Qovurilgan kartoshka", nb: "1.5–2 osh qoshiq", weight: "35 g" },
    { name: "Kartoshka Fri", nb: "12 bo‘lak", weight: "35 g" },
    { name: "Kartoshkali chips", nb: "1 kichik o‘ram", weight: "25 g" },
    { name: "Jo‘xori (so‘tasi)", nb: "0.5 dona", weight: "100 g" },
    { name: "Konservalangan jo‘xori", nb: "3 osh qoshiq", weight: "70 g" },
    { name: "Gaynatilgan jo‘xori", nb: "3 osh qoshiq", weight: "50 g" },
    { name: "Jo‘xori bodrogi", nb: "4 osh qoshiq", weight: "15 g" },
    { name: "Sabzi", nb: "3 ta katta sabzi", weight: "400 g" },
    { name: "Lavlagi", nb: "2 ta katta lavlagi", weight: "400 g" },
    { name: "Gaynatilgan loviya", nb: "3 osh qoshiq", weight: "50 g" },
    { name: "Gaynatilgan chechevitsa", nb: "2 osh qoshiq to‘la", weight: "50 g" },
    { name: "Qovoq", nb: "-", weight: "200 g" },
    { name: "Ketchup", nb: "2–3 osh qoshiq", weight: "30–50 g" },
    { name: "Topinambur", nb: "-", weight: "70 g" },
    { name: "Soya (quritilgan)", nb: "4 osh qoshiq", weight: "45 g" },
  ],
  nonlik: [
    { name: "Oddiy non", nb: "1 bo‘lak", weight: "35 g" },
    { name: "Javdar unidan tayyorlangan non", nb: "1 bo‘lak", weight: "20 g" },
    { name: "Oq, kulcha non", nb: "1 bo‘lak", weight: "25 g" },
    { name: "Qora non", nb: "1 bo‘lak", weight: "30 g" },
    { name: "Kepakli non", nb: "1 bo‘lak", weight: "25 g" },
    { name: "Quritilgan non to‘g‘ralari", nb: "2 dona", weight: "20 g" },
    { name: "Nonli bo‘yoqchalar", nb: "Hajmiga qarab", weight: "20 g" },
    { name: "Shirin bo‘lmagan gotirligan non", nb: "2 dona", weight: "20 g" },
    { name: "Shirin bo‘lmagan teshik kulcha", nb: "1.5–2 dona", weight: "20 g" },
    { name: "Kreker", nb: "2 dona", weight: "20 g" },
    { name: "Muzlatilgan oshirma xamir", nb: "-", weight: "35 g" },
    { name: "Yupqa qaymoq", nb: "1 katta", weight: "30 g" },
    { name: "Tvorogli qaymoq", nb: "1 dona", weight: "50 g" },
    { name: "Go‘shtli qaymoq", nb: "1 dona", weight: "50 g" },
    { name: "Tvorogli varenik", nb: "4 dona", weight: "50 g" },
    { name: "Chuchvara", nb: "4 dona", weight: "50 g" },
    { name: "Paramach", nb: "1 dona", weight: "50 g" },
    { name: "Vafli maydasi", nb: "1 dona", weight: "50 g" },
    { name: "Un", nb: "1 osh qoshiq to‘la", weight: "15 g" },
    { name: "Pryanik", nb: "1/2 dona", weight: "40 g" },
    { name: "Olad’", nb: "1 o‘rtacha", weight: "30 g" },
    { name: "Quritilgan gotirligan non", nb: "1 osh qoshiq to‘la", weight: "15 g" },
    { name: "Pechene (qaymoqli)", nb: "1–2 dona", weight: "15 g" },
    { name: "Yormalar (krupa)", nb: "1 osh qoshiq to‘la", weight: "15 g" },
    { name: "Xom guruch", nb: "1 osh qoshiq to‘la", weight: "15 g" },
  ],
  mevaSabzavot: [
    { name: "Aprikos (O'rik)", nb: "2 dona", weight: "100 g" },
    { name: "Avokado", nb: "1 dona", weight: "200 g" },
    { name: "Behi", nb: "1 dona", weight: "140 g" },
    { name: "Olcha", nb: "4 dona", weight: "140 g" },
    { name: "Ananas", nb: "1 kichik bo'lak", weight: "130 g" },
    { name: "Apelsin", nb: "1 dona", weight: "270 g" },
    { name: "Tarvuz", nb: "1 bo‘lak", weight: "70 g" },
    { name: "Banan", nb: "½ dona", weight: "80 g" },
    { name: "Uzum", nb: "10 dona", weight: "90 g" },
    { name: "Greypfrut", nb: "½ dona", weight: "100 g" },
    { name: "Nok", nb: "1 dona", weight: "100 g" },
    { name: "Qovun", nb: "1 bo‘lak", weight: "140 g" },
    { name: "Maymunjon (Anjir)", nb: "1 dona", weight: "110 g" },
    { name: "Kivi", nb: "1 dona", weight: "160 g" },
  ],
  quritilgan: [
    { name: "Bahor mevasi (quritilgan)", nb: "1 dona", weight: "-" },
    { name: "Mayiz", nb: "10 dona", weight: "-" },
    { name: "Anjir (quritilgan)", nb: "1 dona", weight: "-" },
    { name: "Turonak (dana)", nb: "3 dona", weight: "-" },
    { name: "Xurmo (quritilgan)", nb: "2 dona", weight: "-" },
    { name: "Qizil olxo‘ri qoqi", nb: "3 dona", weight: "-" },
    { name: "Yong‘oqlar (umumiy)", nb: "1 osh qoshiq", weight: "-" },
    { name: "Yer yong‘og‘i", nb: "1/4 stakan", weight: "-" },
    { name: "Bodom", nb: "3/4 stakan", weight: "-" },
    { name: "Pista (handon)", nb: "1/2 stakan", weight: "-" },
  ],
  shirinlik: [
    { name: "Shakarli murabbo", nb: "1 osh qoshiq", weight: "-", calories: "10.0" },
    { name: "Gazlangan ichimliklar", nb: "½ stakan", weight: "-", calories: "100.0" },
    { name: "Karamel", nb: "4–6 dona", weight: "-", calories: "-" },
    { name: "Kvas", nb: "1 stakan", weight: "-", calories: "250.0" },
    { name: "Kisel", nb: "1 stakan", weight: "-", calories: "250.0" },
    { name: "Kompot", nb: "1 stakan", weight: "-", calories: "16.9" },
    { name: "Shokoladli konfet", nb: "1 dona", weight: "10–12 g" },
    { name: "Asal", nb: "2 bo‘lak", weight: "10 g" },
    { name: "Novvot", nb: "1 choy qoshiq", weight: "15 g" },
    { name: "Sumalak", nb: "1 osh qoshiq", weight: "10 g" },
    { name: "Shakar qumi", nb: "1 osh qoshiq", weight: "12 g" },
    { name: "Shokolad", nb: "3 bo'lak", weight: "30 g" },
  ],
};

export default function ProductsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const renderSection = (title, items) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-l-4 border-purple-600 pl-4">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  {item.name}
                </h3>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3 text-purple-600">
                      <FaAppleAlt size={14} />
                    </span>
                    <span className="font-medium">{item.nb}</span>
                  </div>
                  
                  {item.weight && item.weight !== "-" && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                        <FaWeightHanging size={14} />
                      </span>
                      <span>Vazni: <strong>{item.weight}</strong></span>
                    </div>
                  )}

                  {item.calories && item.calories !== "-" && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mr-3 text-orange-600">
                        <FaFireAlt size={14} />
                      </span>
                      <span>Energiya: <strong>{item.calories} kkal</strong></span>
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
    <div className="bg-gray-50 min-h-screen font-sans">
  <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Mahsulotlar Katalogi</h1>
            <p className="text-gray-500">Sog'lom turmush tarzi uchun mahsulotlar me'yori</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Mahsulot nomini yozing..."
              className="w-full pl-12 pr-4 py-3 bg-white border-none shadow-sm rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Sections */}
        {renderSection("🌾 Dukkakliklar va Sabzavotlar", categories.dukkaklik)}
        {renderSection("🍞 Non va Xamirli Mahsulotlar", categories.nonlik)}
        {renderSection("🍎 Sarhil Mevalar", categories.mevaSabzavot)}
        {renderSection("🥜 Quritilgan Mevalar va Yong'oqlar", categories.quritilgan)}
        {renderSection("🍰 Shirinliklar va Ichimliklar", categories.shirinlik)}

        {/* Empty State */}
        {Object.values(categories).every(cat => 
          cat.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).length === 0
        ) && (
          <div className="text-center py-20">
            <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <FaSearch size={30} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Mahsulot topilmadi</h3>
            <p className="text-gray-500">Qidiruv so'zini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>

      <footer className="text-center py-10 text-gray-400 text-sm">
        &copy; 2026 DiaNova - Sog'liqni saqlash platformasi
      </footer>
    </div>
  );
}