import React from "react";
import FeedbackForm from "./FeedbackForm";
import ServiceForm from "./ServiceForm";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-full md:w-1/2 bg-[#F2F2FF] rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl flex flex-col items-center bg-[#F2F2FF]">
      {/* Tab Buttons */}
      <div className="flex justify-center py-6 w-full">
        <div className="relative bg-white p-1 rounded-xl flex w-80 shadow-sm">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#5438DC] rounded-lg transition-all duration-500 ${
              activeTab === "feedback" ? "left-1" : "left-[50%]"
            }`}
          ></div>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`relative flex-1 py-2 font-medium transition-colors z-10 ${
              activeTab === "feedback" ? "text-white" : "text-gray-600"
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className={`relative flex-1 py-2 font-medium transition-colors z-10 ${
              activeTab === "service" ? "text-white" : "text-gray-600"
            }`}
          >
            Service
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md px-6 md:px-8 pb-12">
        {activeTab === "feedback" ? <FeedbackForm /> : <ServiceForm />}
      </div>
    </div>
  );
}

export default Tabs;
