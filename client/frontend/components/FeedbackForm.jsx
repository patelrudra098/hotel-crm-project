import React, { useState } from "react";

// Modal Component
function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-[#5438DC] text-white px-6 py-2 rounded-xl hover:bg-[#432dc7] transition font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: null,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://hotel-crm-project.onrender.com/api/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        setFormData({ name: "", email: "", message: "", rating: null });
        setShowModal(true);
      } else {
        const errData = await res.json();
        alert("❌ Error: " + errData.error);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page to show updated feedback
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-[#5438DC] mb-6 text-center">
        Share Your Feedback
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />

        {/* Rating */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-gray-700 font-medium">Rating</label>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rating: num }))
                }
                className={`w-12 h-12 border rounded-xl flex items-center justify-center transition font-medium
          ${
            formData.rating === num
              ? "bg-[#5438DC] text-white" // active (selected)
              : "bg-white text-black hover:bg-[#5438DC] hover:text-white"
          }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        ></textarea>
        <button
          type="submit"
          className="bg-[#5438DC] text-white py-3 rounded-xl hover:bg-[#432dc7] transition shadow-md font-medium"
        >
          Submit Feedback
        </button>
      </form>

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        message="Your feedback has been submitted successfully! Thank you for sharing your experience with us."
      />
    </>
  );
}

export default FeedbackForm;
