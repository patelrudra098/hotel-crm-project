const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    const feedback = new Feedback({ name, email, rating, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Feedback.find();
    console.log("Fetched reviews:", reviews);   // 👈 log to console
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


