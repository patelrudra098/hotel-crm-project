import React from "react";
import { FaTools, FaUser, FaEnvelope, FaDoorOpen } from "react-icons/fa";

function CardsSection({ activeTab }) {
  // Dummy Data
  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message: "Amazing hospitality! Staff was super friendly and helpful.",
    },
    {
      id: 2,
      name: "Sarah Lee",
      email: "sarah@example.com",
      message: "Loved the room service and quick response time!",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      message: "The stay was delightful, will definitely come again!",
    },
  ];

  const services = [
    {
      id: 1,
      name: "David Kim",
      email: "david@example.com",
      room: "204",
      serviceType: "Room Cleaning",
      priority: "Urgent",
      message: "Please clean the room before 5 PM.",
    },
    {
      id: 2,
      name: "Emma Watson",
      email: "emma@example.com",
      room: "309",
      serviceType: "Food Delivery",
      priority: "Normal",
      message: "Kindly deliver dinner at 8 PM.",
    },
  ];

  const isFeedback = activeTab === "feedback";

  return (
    <section className="w-screen bg-[#F2F2FF] py-20 px-4 md:px-12 overflow-x-hidden">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-[#5438DC] font-sora">
          {isFeedback ? "Guest Feedback" : "Service Requests"}
        </h2>
        <p className="text-gray-700 text-lg mt-3 font-dmsans">
          {isFeedback
            ? "Here’s what our guests are saying about their experience with us."
            : "Recent service requests from our valued guests – ensuring comfort made simple."}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isFeedback
          ? feedbacks.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-lg bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-1 transition transform"
              >
                <div className="flex items-center gap-3 mb-5">
                  <FaUser className="text-[#5438DC] text-2xl" />
                  <h3 className="font-semibold text-lg text-[#5438DC]">
                    {item.name}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
                  <FaEnvelope /> {item.email}
                </p>
                <p className="text-gray-800 text-base leading-relaxed italic">
                  “{item.message}”
                </p>
              </div>
            ))
          : services.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-lg bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-1 transition transform"
              >
                <div className="flex items-center gap-3 mb-5">
                  <FaTools className="text-[#5438DC] text-2xl" />
                  <h3 className="font-semibold text-lg text-[#5438DC]">
                    {item.serviceType}
                  </h3>
                </div>

                <div className="space-y-2 text-gray-600 text-sm">
                  <p className="flex items-center gap-2">
                    <FaUser /> {item.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope /> {item.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDoorOpen /> Room {item.room}
                  </p>
                </div>

                {/* Priority Badge */}
                <div className="mt-4">
                  <span
                    className={`px-4 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      item.priority === "Urgent"
                        ? "bg-red-100 text-red-600 border border-red-200"
                        : "bg-green-100 text-green-600 border border-green-200"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <p className="mt-5 text-gray-800 text-base leading-relaxed italic">
                  “{item.message}”
                </p>

                {/* Show rating */}
                <p className="mt-3 text-sm font-semibold text-[#5438DC]">
                  Rating: {item.rating} ⭐
                </p>
              </div>
            ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm font-dmsans">
        <p>© 2025 HotelNest – Crafted with care to enhance your stay.</p>
      </div>
    </section>
  );
}

export default CardsSection;
