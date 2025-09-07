import React, { useState, useEffect } from "react";
import { FaTools, FaUser, FaEnvelope, FaDoorOpen, FaSpinner } from "react-icons/fa";

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
      const response = await fetch("https://1646e539561a.ngrok-free.app/api/feedback", {
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
      const response = await fetch("https://1646e539561a.ngrok-free.app/api/service-request", {
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
                        
                        {/* Rating */}
                        {item.rating && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-semibold text-[#5438DC]">
                              Rating: {item.rating}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">
                                  {i < item.rating ? "⭐" : "☆"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <p className="text-gray-800 text-base leading-relaxed italic">
                          "{item.message}"
                        </p>
                        
                        {/* Date */}
                        <p className="text-xs text-gray-400 mt-3">
                          {new Date(item.createdAt || item._id).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    ))
                  : displayedData.map((item) => (
                      <div
                        key={item._id}
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
                            <FaEnvelope /> {item.contact}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaDoorOpen /> {item.roomOrBooking}
                          </p>
                        </div>

                        {/* Priority Badge */}
                        <div className="mt-4">
                          <span
                            className={`px-4 py-1 text-xs font-semibold rounded-full shadow-sm ${
                              item.priority === "Urgent"
                                ? "bg-red-100 text-red-600 border border-red-200"
                                : item.priority === "High"
                                ? "bg-orange-100 text-orange-600 border border-orange-200"
                                : "bg-green-100 text-green-600 border border-green-200"
                            }`}
                          >
                            {item.priority || "Normal"}
                          </span>
                        </div>

                        <p className="mt-5 text-gray-800 text-base leading-relaxed italic">
                          "{item.message}"
                        </p>

                        {/* Date */}
                        <p className="text-xs text-gray-400 mt-3">
                          {new Date(item.createdAt || item._id).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="bg-[#5438DC] hover:bg-[#4429c7] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
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
        <p>© 2025 HotelNest – Crafted with care to enhance your stay.</p>
      </div>
    </section>
  );
}

export default CardsSection;