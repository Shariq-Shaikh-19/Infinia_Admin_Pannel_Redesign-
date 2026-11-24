import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Brand() {
  const navigate = useNavigate();

  const brands = [
    { name: "Ecomagix", path: "/ecomagix", description: "Explore Ecomagix" },
    { name: "Claymagix", path: "/claymagix", description: "Explore Claymagix" },
    { name: "Woodmagix", path: "/woodmagix", description: "Explore Woodmagix" },
    { name: "Skyace", path: "/skyace", description: "Explore Skyace" },
  ];

  return (
    <div className="min-h-screen ml-[18px] flex items-center justify-center px-8 py-12 bg-slate-50">

      <div className="w-full max-w-5xl">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-sky-600 mb-3">
            Brand Management
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Choose Your Brand
          </h1>

          <p className="text-slate-500 mt-3">
            Select a brand to manage its content and details.
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {brands.map((brand, index) => (
            <button
              key={brand.path}
              onClick={() => navigate(brand.path)}
              className="group text-left bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-sm font-semibold text-slate-400">
                  0{index + 1}
                </span>

                <span className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <FaArrowRight size={13} />
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                {brand.name}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {brand.description}
              </p>

              <div className="w-10 h-1 bg-sky-400 rounded-full mt-6 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}