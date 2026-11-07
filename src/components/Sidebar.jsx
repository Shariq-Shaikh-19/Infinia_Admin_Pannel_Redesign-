import React from "react";
import { 
  FiLayout, 
  FiHome, 
  FiFileText, 
  FiInfo, 
  FiTag, 
  FiCalendar, 
  FiShoppingBag 
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "DASHBOARD", icon: FiLayout, path: "/dashboard" },
    { name: "HOME", icon: FiHome, path: "/home" },
    { name: "BLOG", icon: FiFileText, path: "/blog" },
    { name: "ABOUT", icon: FiInfo, path: "/about" },
    { name: "BRAND", icon: FiTag, path: "/brand" },
    { name: "EVENTS", icon: FiCalendar, path: "/events" },
    { name: "PRODUCTS", icon: FiShoppingBag, path: "/products" },
  ];

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-gradient-to-b from-[#090042] via-[#0d0354] to-[#090042] backdrop-blur-md text-purple-100 border-r border-indigo-500/20 shadow-xl z-40 flex flex-col py-6 px-4">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-purple-500/20 text-white border border-purple-400/30 shadow-md shadow-purple-900/30"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className={`text-lg ${isActive ? "text-purple-300" : "text-purple-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}