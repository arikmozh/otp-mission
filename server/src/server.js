const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

require("dotenv").config();

const otpRoutes = require('./routes/otp');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use('/api', otpRoutes);

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);