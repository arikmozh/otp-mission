import React, { useState, FormEvent } from "react";
import axios from "axios";
import "../App.css"; // Import the CSS file

const OtpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("white");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false); // State to track verification error
  const [isVerified, setIsVerified] = useState<boolean>(false); // State to track verification success
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post("http://localhost:8000/api/send-otp", {
        email,
      });
      setMessageColor("white");
      setMessage(response.data.message);
      setIsOtpSent(true);
      setVerifyError(false); // Reset verify error
    } catch (error) {
      setMessage("Error sending OTP");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify-otp",
        { email, otp }
      );
      setMessageColor("white");
      setMessage(response.data.message);
      setVerifyError(false); // Reset verify error if successful
      setIsVerified(true); // Set verified state
    } catch (error) {
      setMessage("Error verifying OTP");
      setMessageColor("red");
      setVerifyError(true); // Set verify error on failure
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "http://localhost:8000/api/resend-otp",
        { email }
      );
      setMessage(response.data.message);
      setMessageColor("white");
      setVerifyError(false); // Reset verify error
    } catch (error) {
      setMessage("Error resending OTP");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleResetForm = () => {
    setEmail("");
    setOtp("");
    setMessage("");
    setMessageColor("white");
    setIsOtpSent(false);
    setVerifyError(false);
    setIsVerified(false);
  };

  return (
    <div className="container">
      {!isLoading ? <h1>OTP GENERATOR</h1> : ""}
      <div className="form-wrapper">
        {isLoading ? (
          <div className="spinner"></div>
        ) : !isOtpSent ? (
          <form onSubmit={handleSendOtp}>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send OTP</button>
          </form>
        ) : isVerified ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "green", fontWeight: "bold" }}>
              Your email <span style={{ color: "#4f46e5" }}>{email}</span> has
              been successfully verified!
            </span>

            <button onClick={handleResetForm} className="reset">
              Verify Another Email
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleVerifyOtp}>
              <div>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Verify OTP</button>
            </form>
            {verifyError && (
              <button onClick={handleResendOtp} className="resend">
                Resend OTP
              </button>
            )}
          </div>
        )}
        {message && (
          <p
            className="message"
            style={{
              color: messageColor,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpForm;
