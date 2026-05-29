const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  messages: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  tokens: [{
    token: { type: String, required: true },
  }],
}, {
  timestamps: true,
});

// Index for fast email lookups
userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generate JWT and store it
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: '7d',
  });
  // Keep only last 5 tokens to prevent document bloat
  if (this.tokens.length >= 5) {
    this.tokens = this.tokens.slice(-4);
  }
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// Add contact message
userSchema.methods.addMessage = async function (name, email, phone, message) {
  this.messages = this.messages.concat({ name, email, phone, message });
  await this.save();
  return this.messages;
};

const User = mongoose.model('user', userSchema);

module.exports = User;