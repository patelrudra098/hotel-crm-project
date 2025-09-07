import React from "react";
import { FaHotel } from "react-icons/fa"; // Hotel-themed logo

function Navbar() {
  return (
    <nav className="bg-[#F2F2FF] shadow-sm w-screen">
      <div className="px-6 md:px-12 py-5 flex items-center gap-3 max-w-screen-xl mx-auto">
        <FaHotel className="text-[#5438DC] text-3xl" />
        <a
          href="#"
          className="text-2xl font-sora font-bold text-[#5438DC] tracking-wide"
        >
          Hotel<span className="text-gray-700">Nest</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
