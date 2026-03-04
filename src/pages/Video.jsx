import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Video = () => {
  const diabetesVideos = [
    { id: 1, videoId: "nHeYvT7Yp6s", title: "Qandli diabet haqida umumiy ma'lumot" },
    { id: 2, videoId: "XfyGv-xw88s", title: "Diabetda to'g'ri ovqatlanish" },
    { id: 3, videoId: "X96f0_P8VvU", title: "Qandli diabet belgilari va davolash" },
    { id: 4, videoId: "kYj0J3N_ygY", title: "Insulin va qon shakarini nazorat qilish" },
    { id: 5, videoId: "aBcdEfGhIjK", title: "Qandli diabetda mashqlar va harakat" },
    { id: 6, videoId: "LmNoPqRsTuV", title: "Diabet kasalligida psixologik maslahatlar" },
    { id: 7, videoId: "WxYzAbCdEfG", title: "Qandli diabetning turli turlari" },
    { id: 8, videoId: "HiJkLmNoPqR", title: "Oziq-ovqat tanlovi va diabet" },
    { id: 9, videoId: "StUvWxYzAbC", title: "Qandli diabet va hayot sifati" },
    { id: 10, videoId: "QwErTyUiOp1", title: "Diabet bilan yashash strategiyalari" },
    { id: 11, videoId: "AsDfGhJkL2", title: "Diabet va yurak salomatligi" },
    { id: 12, videoId: "ZxCvBnMmN3", title: "Shakarni kamaytirish bo‘yicha maslahatlar" },
    { id: 13, videoId: "PoIuYtReW4", title: "Diabet va bolalar" },
    { id: 14, videoId: "LkJhGfDsA5", title: "Uy sharoitida diabetni nazorat qilish" },
    { id: 15, videoId: "MnBvCxZaQ6", title: "Diabetda diet va sport" },
  ];

  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
     <div>
       <Navbar/>
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Qandli diabet haqida foydali videolar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {diabetesVideos.slice(0, visibleCount).map((video) => (
          <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <p className="font-semibold text-gray-800">{video.title}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < diabetesVideos.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
          >
            Show More
          </button>
        </div>
      )}
    </div>
     </div>
  );
};

export default Video;