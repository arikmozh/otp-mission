import React, { useState, FormEvent } from "react";
import axios from "axios";
import "../App.css";

const OtpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("white");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false); // Verification error State
  const [isVerified, setIsVerified] = useState<boolean>(false); // Verification success State
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading State
  const apiUrl = "http://localhost:8000/api";

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/send-otp`, {
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
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/verify-otp`, { email, otp });
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
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/resend-otp`, { email });
      setMessage(response.data.message);
      setMessageColor("white");
      setVerifyError(false);
    } catch (error) {
      setMessage("Error resending OTP");
    } finally {
      setIsLoading(false);
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
                  maxLength={6}
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
