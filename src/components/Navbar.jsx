import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import InfiniaLogo from "../assets/InfiniaLogo.png";

export default function Navbar({ onLogout }) {
  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-[#d68afc] via-[#090042] to-[#090042] backdrop-blur-md z-50 flex items-center justify-between px-12 text-purple-100 border-b border-indigo-500/20 shadow-lg">
      
      {/* Left Side: Brand Logo */}
      <div className="w-[16%] flex items-center">
        <img src={InfiniaLogo} alt="Infinia Logo" className="pl-5 h-14 w-auto object-contain" />
      </div>

      {/* Middle: Search Bar */}
      <div className="relative w-96">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/50 border border-purple-300/30 text-white placeholder-black rounded-xl pl-12 pr-4 py-1.5 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-200"
        />
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-all duration-200">
          <FiBell className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-400 rounded-full ring-2 ring-indigo-950" />
        </button>

        {/* Separator Line */}
        <div className="h-6 w-px bg-purple-400/30" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer text-purple-100 hover:text-white transition-colors">
          <FaRegUser size={20}/>
          <div className="flex flex-col text-left">
            <span className="text-[15px]">Admin</span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-6 w-px bg-purple-400/30" />

        {/* Logout Button */}
        <button
          title="Logout"
          onClick={() => {
            if (onLogout) onLogout();
          }}
          className="p-2 rounded-xl text-purple-300 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
        >
          <RiLogoutCircleRLine className="text-xl" />
        </button>
      </div>

    </div>
  );
}