// src/App.jsx yoki Routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ChatBot from "./pages/Chatbot";
import Video from "./pages/Video";
import ProfileCard from "./pages/Profile";
import Mahsulotlar from "./pages/Mahsulotlar";
import Premium from "./pages/Premium";
import DoctorConsultation from "./pages/DoctorConsutatsion";
import DoctorChat from "./pages/DoctorChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/video" element={<Video />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/products" element={<Mahsulotlar />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/doctorConsultation" element={<DoctorConsultation />} />
          <Route path="/doctorChat" element={<DoctorChat />} />
          <Route path="/doctorChat/:id" element={<DoctorChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;