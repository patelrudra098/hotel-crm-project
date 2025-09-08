import React, { useState } from "react";

// Modal Component
function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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

function ServiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",          // backend expects contact
    roomOrBooking: "",    // backend expects roomOrBooking
    serviceType: "",
    priority: "Normal",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://hotel-crm-project.onrender.com/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          name: "",
          contact: "",
          roomOrBooking: "",
          serviceType: "",
          priority: "Normal",
          message: "",
        });
        setShowModal(true);
      } else {
        const errData = await res.json();
        alert("❌ Error: " + errData.error);
      }
    } catch (err) {
      console.error("Error submitting service request:", err);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page to show updated service requests
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-[#5438DC] mb-6 text-center">
        Request a Service
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Email or Phone"
          required
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <input
          type="text"
          name="roomOrBooking"
          value={formData.roomOrBooking}
          onChange={handleChange}
          placeholder="Room or Booking ID"
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        >
          <option value="">Select Service Type</option>
          <option>Room Cleaning</option>
          <option>Maintenance Issue</option>
          <option>Food/Beverage Request</option>
          <option>Complaint</option>
          <option>General Inquiry</option>
        </select>
        <textarea
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        ></textarea>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="bg-white p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>
        <button
          type="submit"
          className="bg-[#5438DC] text-white py-3 rounded-xl hover:bg-[#432dc7] transition shadow-md font-medium"
        >
          Submit Request
        </button>
      </form>

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        message="Your service request has been submitted successfully! Our team will get back to you soon."
      />
    </>
  );
}

export default ServiceForm;