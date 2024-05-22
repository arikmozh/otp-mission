const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to otp-mongodb!"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;

