import React, { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import "../App.css";
import EmailForm from "./EmailForm";
import OtpFormComponent from "./OtpFormComponent";
import Notification from "./Notification";
import Spinner from "./Spinner";

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

  const handleRequest = async (
    url: string,
    data: object,
    successCallback: () => void
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, data);
      setMessageColor("white");
      setMessage(response.data.message);
      successCallback();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "An error occurred");
      } else {
        setMessage("An unexpected error occurred");
      }
      setMessageColor("red");
      setVerifyError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();
    handleRequest(`${apiUrl}/send-otp`, { email }, () => {
      setIsOtpSent(true);
      setVerifyError(false);
    });
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    handleRequest(`${apiUrl}/verify-otp`, { email, otp }, () => {
      setVerifyError(false);
      setIsVerified(true);
    });
  };

  const handleResendOtp = () => {
    handleRequest(`${apiUrl}/resend-otp`, { email }, () => {
      setVerifyError(false);
    });
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
      {!isLoading && <h1>OTP GENERATOR</h1>}
      <div className="form-wrapper">
        {isLoading ? (
          <Spinner />
        ) : !isOtpSent ? (
          <EmailForm
            email={email}
            setEmail={setEmail}
            handleSendOtp={handleSendOtp}
          />
        ) : isVerified ? (
          <Notification
            message={message}
            color={messageColor}
            email={email}
            handleResetForm={handleResetForm}
          />
        ) : (
          <OtpFormComponent
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            handleResendOtp={handleResendOtp}
            verifyError={verifyError}
          />
        )}
        {message && !isVerified && !isLoading && (
          <Notification message={message} color={messageColor} />
        )}
      </div>
    </div>
  );
};

export default OtpForm;
