// src/App.jsx yoki Routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ChatBot from "./pages/Chatbot";
import ProfileCard from "./pages/Profile";
import Mahsulotlar from "./pages/Mahsulotlar";
import Premium from "./pages/Premium";
import DoctorConsultation from "./pages/DoctorConsutatsion";
import DoctorChat from "./pages/DoctorChat";
import Checkout from "./pages/Checkout";
import QandPage from "./pages/QandPage";
import TestPage from "./pages/TestPage";
import InsulinPage from "./pages/InsulinPage";
import HealthPage from "./pages/HealthPage";
import EmergencyHealthPage from "./pages/EmergencyHealthPage";
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
          <Route path="/products" element={<Mahsulotlar />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/doctorConsultation" element={<DoctorConsultation />} />
          <Route path="/doctorChat" element={<DoctorChat />} />
          <Route path="/doctorChat/:id" element={<DoctorChat />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/qand" element={<QandPage />} /> 
          <Route path="/insulin" element={<InsulinPage />} /> 
          <Route path="/salomatlik" element={<HealthPage />} />
          <Route path="/favqulot" element={<EmergencyHealthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;