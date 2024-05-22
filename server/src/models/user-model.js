const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
