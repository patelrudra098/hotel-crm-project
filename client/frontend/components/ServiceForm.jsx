import React, { useState } from "react";

function ServiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    room: "",
    serviceType: "",
    priority: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://192.168.1.3:5000/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Service request submitted!");
        setFormData({
          name: "",
          email: "",
          room: "",
          serviceType: "",
          priority: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Error submitting service request:", err);
    }
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
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          placeholder="Room Number"
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        />
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        >
          <option value="">Select Service Type</option>
          <option>Room Cleaning</option>
          <option>Laundry</option>
          <option>Food Delivery</option>
          <option>Maintenance</option>
        </select>
        <textarea
          rows="4"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        ></textarea>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5438DC]"
        >
          <option value="">Select Priority</option>
          <option>Urgent</option>
          <option>Normal</option>
        </select>
        <button
          type="submit"
          className="bg-[#5438DC] text-white py-3 rounded-xl hover:bg-[#432dc7] transition shadow-md font-medium"
        >
          Submit Request
        </button>
      </form>
    </>
  );
}

export default ServiceForm;
