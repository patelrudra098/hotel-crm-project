const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true }, // email or phone
  roomOrBooking: { type: String, default: null, trim: true },
  serviceType: {
    type: String,
    required: true,
    enum: ['Room Cleaning', 'Maintenance Issue', 'Food/Beverage Request', 'Complaint', 'General Inquiry']
  },
  message: { type: String, required: true, trim: true },
  priority: { type: String, enum: ['Normal', 'Urgent'], default: 'Normal' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
