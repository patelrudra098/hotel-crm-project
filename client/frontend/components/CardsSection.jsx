import React, { useState, useEffect } from "react";
import { FaTools, FaUser, FaEnvelope, FaDoorOpen, FaSpinner, FaHeart, FaStar, FaQuoteLeft, FaClock, FaFlag } from "react-icons/fa";

function CardsSection({ activeTab }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(3);
  
  const isFeedback = activeTab === "feedback";
  const currentData = isFeedback ? feedbacks : services;
  const displayedData = currentData.slice(0, displayCount);
  const hasMore = currentData.length > displayCount;

  // Fetch feedback data
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://hotel-crm-project.onrender.com/api/feedback", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
        },
      });
      
      console.log('Feedback Response Status:', response.status);
      console.log('Feedback Response Headers:', response.headers);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Feedback Data:', data);
          // Sort by creation date (newest first) - assuming createdAt field or _id
          const sortedData = data.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
          setFeedbacks(sortedData);
        } else {
          const textResponse = await response.text();
          console.error("Expected JSON but got:", textResponse.substring(0, 200));
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch feedback. Status:", response.status, "Response:", errorText.substring(0, 200));
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      console.error("This might be a CORS issue or ngrok browser warning");
    } finally {
      setLoading(false);
    }
  };

  // Fetch service requests data
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://hotel-crm-project.onrender.com/api/service-request", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
        },
      });
      
      console.log('Service Request Response Status:', response.status);
      console.log('Service Request Response Headers:', response.headers);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Service Request Data:', data);
          // Sort by creation date (newest first)
          const sortedData = data.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
          setServices(sortedData);
        } else {
          const textResponse = await response.text();
          console.error("Expected JSON but got:", textResponse.substring(0, 200));
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch service requests. Status:", response.status, "Response:", errorText.substring(0, 200));
      }
    } catch (error) {
      console.error("Error fetching service requests:", error);
      console.error("This might be a CORS issue or ngrok browser warning");
    } finally {
      setLoading(false);
    }
  };

  // Load more items
  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 3);
      setLoadingMore(false);
    }, 500); // Small delay for better UX
  };

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    setDisplayCount(3); // Reset display count when tab changes
    if (isFeedback) {
      fetchFeedbacks();
    } else {
      fetchServices();
    }
  }, [activeTab]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3 text-[#5438DC]">
        <FaSpinner className="text-2xl animate-spin" />
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );

  // Load more button loading state
  const LoadMoreSpinner = () => (
    <div className="flex items-center gap-2 text-[#5438DC]">
      <FaSpinner className="animate-spin" />
      <span>Loading more...</span>
    </div>
  );

  return (
    <section className="w-screen bg-[#F2F2FF] py-20 px-4 md:px-12 overflow-x-hidden">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-[#5438DC] font-sora">
          {isFeedback ? "Guest Feedback" : "Service Requests"}
        </h2>
        <p className="text-gray-700 text-lg mt-3 font-dmsans">
          {isFeedback
            ? "Here's what our guests are saying about their experience with us."
            : "Recent service requests from our valued guests – ensuring comfort made simple."}
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* No Data Message */}
          {currentData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {isFeedback 
                  ? "No feedback available yet. Be the first to share your experience!" 
                  : "No service requests at the moment."
                }
              </div>
            </div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isFeedback
                  ? displayedData.map((item) => (
                      <div
                        key={item._id}
                        className="relative group bg-gradient-to-br from-white via-white to-purple-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-purple-100 hover:border-purple-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                      >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-purple-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
                        
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 text-purple-200 text-2xl">
                          <FaQuoteLeft />
                        </div>
                        
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#5438DC] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <FaUser className="text-white text-lg" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <FaEnvelope className="text-xs" /> {item.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        {item.rating && (
                          <div className="flex items-center justify-between mb-6 bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-500" />
                              <span className="font-semibold text-gray-800">Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-yellow-600">{item.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-yellow-400 text-lg">
                                    {i < item.rating ? "⭐" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Message */}
                        <div className="relative mb-6">
                          <p className="text-gray-700 text-base leading-relaxed italic font-medium bg-gray-50 p-4 rounded-2xl border-l-4 border-[#5438DC]">
                            "{item.message}"
                          </p>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <FaClock className="text-xs" />
                            <span>
                              {new Date(item.createdAt || item._id).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-red-400">
                            <FaHeart className="text-xs animate-pulse" />
                            <span className="text-xs font-medium">Thank you!</span>
                          </div>
                        </div>
                      </div>
                    ))
                  : displayedData.map((item) => (
                      <div
                        key={item._id}
                        className="relative group bg-gradient-to-br from-white via-white to-blue-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-blue-100 hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                      >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-200 rounded-full opacity-40 animate-bounce"></div>
                        <div className="absolute bottom-6 right-6 w-4 h-4 bg-blue-300 rounded-full opacity-30 animate-bounce delay-500"></div>
                        
                        {/* Service Type Header */}
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#5438DC] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                            <FaTools className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-2">
                              {item.serviceType}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                                  item.priority === "Urgent"
                                    ? "bg-red-100 text-red-700 border border-red-200"
                                    : item.priority === "High"
                                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                                    : "bg-green-100 text-green-700 border border-green-200"
                                }`}
                              >
                                <FaFlag className="inline mr-1 text-xs" />
                                {item.priority || "Normal"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Guest Details */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-5 mb-6 border border-gray-100">
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUser className="text-blue-600 text-sm" />
                              </div>
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <FaEnvelope className="text-green-600 text-sm" />
                              </div>
                              <span className="text-sm">{item.contact}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaDoorOpen className="text-purple-600 text-sm" />
                              </div>
                              <span className="text-sm">{item.roomOrBooking}</span>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                          <p className="text-gray-700 text-base leading-relaxed bg-white p-5 rounded-2xl border-l-4 border-[#5438DC] shadow-sm italic">
                            "{item.message}"
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <FaClock className="text-xs" />
                            <span>
                              {new Date(item.createdAt || item._id).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            In Progress
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="bg-[#5438DC] hover:bg-[#432dc7] text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loadingMore ? <LoadMoreSpinner /> : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm font-dmsans">
        <p>© 2025 HotelNest – Crafted with care by rudra and mihir.</p>
      </div>
    </section>
  );
}

export default CardsSection;