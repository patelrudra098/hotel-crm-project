import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://1646e539561a.ngrok-free.app/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("✅ Feedback submitted!");
        setFormData({ name: "", email: "", message: "", rating: null });
      } else {
        const errData = await res.json();
        alert("❌ Error: " + errData.error);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
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
                className={`w-12 h-12 border rounded-xl flex items-center justify-center transition font-medium ${
                  formData.rating === num
                    ? "bg-[#5438DC] text-white"
                    : "hover:bg-[#5438DC] hover:text-white text-gray-600"
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
    </>
  );
}

export default FeedbackForm;
