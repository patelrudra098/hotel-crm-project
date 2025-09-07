const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const feedbackRoute = require('./routes/feedback');
const serviceRequestRoute = require('./routes/serviceRequest');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/feedback', feedbackRoute);
app.use('/service-request', serviceRequestRoute);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hotelCRM')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
