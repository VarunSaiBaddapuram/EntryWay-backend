const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ticket_bookedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  ticket_bookedbyname: {
    type: String,
  },
  ticket_of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'touristsites',
    required: true,
  },
  ticket_ofname: {
    type: String,
  },
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  adult: {
    type: Number,
    default: 0,
  },
  children: {
    type: Number,
    default: 0,
  },
  foreigner: {
    type: Number,
    default: 0,
  },
  Totalpaid: {
    type: Number,
    default: 0,
  },
  Qr_id: {
    type: String,
    default: '',
  },
  Qr_generated: {
    type: String,
    default: '',
  },
  booked_on: {
    type: String,
  },
  valid_for: {
    type: String,
    default: '24 hr',
  },
}, {
  timestamps: true,
});

// Indexes for fast lookups
bookingSchema.index({ ticket_bookedby: 1 });
bookingSchema.index({ ticket_of: 1 });
bookingSchema.index({ adminID: 1 });

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;