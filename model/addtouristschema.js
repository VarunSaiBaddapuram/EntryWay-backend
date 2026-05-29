const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
  Adminid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  siteID: {
    type: String,
    unique: true,
  },
  siteName: {
    type: String,
    required: [true, 'Site name is required'],
    uppercase: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  siteType: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['MONUMENT', 'MUSEUM', 'HOLYPLACE', 'ARTGALLERY'],
  },
  siteDescription: {
    type: String,
    default: '',
  },
  siteAddress: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String },
    zone: {
      type: String,
      required: true,
      enum: ['NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'],
    },
  },
  contact: {
    phoneno: { type: String, required: true },
    email: { type: String, required: true },
  },
  ticketfair: {
    adult: {
      type: Number,
      required: true,
      min: [0, 'Cost cannot be negative'],
    },
    children: {
      type: Number,
      required: true,
      min: [0, 'Cost cannot be negative'],
    },
    foreigner: {
      type: Number,
      required: true,
      min: [0, 'Cost cannot be negative'],
    },
  },
  timings: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
  Availability: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['YES', 'NO'],
  },
  image: {
    type: String,
    default: '',
  },
  Bestseasonvisit: {
    type: String,
    required: true,
  },
  site_added_by: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
}, {
  timestamps: true,
});

// Indexes for fast lookups
touristSchema.index({ siteName: 'text' });
touristSchema.index({ Adminid: 1 });
touristSchema.index({ siteType: 1 });
touristSchema.index({ 'siteAddress.state': 1 });

const TouristSite = mongoose.model('touristsites', touristSchema);

module.exports = TouristSite;