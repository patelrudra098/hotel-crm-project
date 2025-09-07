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
require('dotenv').config();
// Routes
app.use('/feedback', feedbackRoute);
app.use('/service-request', serviceRequestRoute);

// Connect to MongoDB
mongoose.connect(process.env.DBURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

  
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
