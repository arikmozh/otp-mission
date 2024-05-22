# OTP Mission

This project is a demonstration of an OTP (One-Time Password) generator and verification system built using Node.js for the backend and React with Vite for the frontend. The backend sends OTPs to users via email, and the frontend allows users to request and verify OTPs.



## Table of Contents

- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Running Tests](#running-tests)

## Live Demo

You can check out the live demo of the client application [here]([https://pages.github.com](https://otp-mission-client-xd92.vercel.app))..


## Project Structure

otp-mission/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ └── OtpForm.tsx
│ │ │ └── OtpForm.test.tsx
│ │ ├── App.css
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── setupTests.ts
│ ├── jest.config.js
│ ├── tsconfig.json
│ ├── package.json
│ └── vite.config.ts
├── server/
│ ├── src/
│ │ ├── configs/
│ │ │ └── db.js
│ │ ├── controllers/
│ │ │ └── otpController.js
│ │ ├── models/
│ │ │ └── user-model.js
│ │ ├── server.js
│ ├── .env
│ ├── package.json
│ └── README.md

## Setup and Installation

### Backend

1. Navigate to the server directory:

   ```bash
   cd otp-mission/server
   
2. Install dependencies:

   ```bash
    npm install

3. Create a .env file:

   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority&appName=<cluster-name>
   PORT=3000
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   WEATHER_API_KEY=weather-api-key

4. Install dependencies:

   ```bash
    node src/server.js


### Frontend

1. Navigate to the client directory:

   ```bash
   cd otp-mission/client
   
2. Install dependencies:

   ```bash
    npm install

3. Run the client:

   ```bash
   npm run dev

4. Running Tests:

   ```bash
    npm test




