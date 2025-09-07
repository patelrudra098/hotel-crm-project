const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const feedbackRoutes = require("./routes/feedback");
const serviceRoutes = require("./routes/serviceRequest");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/hotelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/service-request", serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hotel Project API Running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
