import React from "react";
import { FaConciergeBell } from "react-icons/fa"; // Icon for extra aesthetics

function LeftPanel() {
  return (
    <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden bg-[#F2F2FF] flex items-center justify-center md:border-b-0 md:border-r border-[#5438DC] ">
      <div className="flex flex-col gap-8 px-8 md:px-12 lg:px-16 text-center md:text-left max-w-xl" style={{borderColor: '#5438DC'}}>
    
        {/* Icon / Tagline */}
        <div className="flex justify-center md:justify-start items-center gap-3">
          <FaConciergeBell className="text-[#5438DC] text-3xl" />
          <span className="text-[#5438DC] font-semibold text-lg tracking-wide">
            Experience Beyond Stay
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#5438DC] font-sora leading-snug">
          Redefining Comfort & Service
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-700 font-dmsans leading-relaxed">
          From personalized service to thoughtful touches, we ensure every detail
          of your stay feels effortless and unforgettable.
        </p>

        {/* Supporting Text */}
        <p className="text-base text-gray-600 font-dmsans">
          Share your <span className="font-semibold text-[#5438DC]">feedback </span> 
          or request a <span className="font-semibold text-[#5438DC]">service</span>. 
          Your voice shapes tomorrow’s hospitality.
        </p>

        {/* Quote */}
        <p className="text-md text-gray-500 italic border-l-4 border-[#5438DC] pl-3">
          “Luxury is in every detail – let us craft yours.”
        </p>
      </div>
    </div>
  );
}

export default LeftPanel;
