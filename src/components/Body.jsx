import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainRoutes from "./MainRoutes";

export default function Body({ onLogout }) {
  return (
    <div className="min-h-screen w-full">
      <Navbar onLogout={onLogout} />

      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 min-w-0 ml-[240px]">
          <MainRoutes />
        </main>
      </div>
    </div>
  );
}
