import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <div>
      <main className="flex-1">
        <Outlet />
      </main>
        
      </div>

    </div>
  );
}