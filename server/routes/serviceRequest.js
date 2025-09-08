const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");

// POST service request
router.post("/", async (req, res) => {
  try {
    const { name, contact, roomOrBooking, serviceType, message, priority } = req.body;
    const request = new ServiceRequest({ name, contact, roomOrBooking, serviceType, message, priority });
    await request.save();
    res.status(201).json({ message: "Service request submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
