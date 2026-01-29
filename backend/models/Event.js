const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  capacity: { type: Number, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);