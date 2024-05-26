const User = require('../models/user-model');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { WEATHER_API_KEY } = process.env;

// Generate OTP based on weather temperatures
const generateOTP = async () => {
  const cities = ['Tel-Aviv', 'New-York', 'Paris'];
  const temps = await Promise.all(
    cities.map(city =>
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`)
    )
  );

  const otp = temps.map(temp => {
    const temperature = Math.abs(Math.round(temp.data.current.temp_c));
    return temperature < 10 ? `0${temperature}` : `${temperature}`;
  }).join('');
  return otp;
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Helper function to generate save and send OTP
const generateAndSendOTP = async (email) => {
  const otp = await generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60000); // 5 minutes

  let user = await User.findOne({ email });
  if (user) {
    user.otp = otp;
    user.otpExpires = otpExpires;
  } else {
    user = new User({ email, otp, otpExpires });
  }

  await user.save();
  await sendOTPEmail(email, otp);

  // Set timeout to clear OTP after 5 minutes
  setTimeout(async () => {
    user.otp = '';
    await user.save();
  }, 5 * 60000); // 5 minutes
};

// Handle OTP request
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    await generateAndSendOTP(email);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Handle resending OTP
exports.resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    await generateAndSendOTP(email);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Handle OTP verification
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const now = new Date();
    if (now > user.otpExpires) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = '';
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'An error occurred while verifying OTP', error: error.message });
  }
};
