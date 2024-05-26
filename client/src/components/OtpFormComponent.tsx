import React from "react";
import InputField from "./InputField";
import Button from "./Button";

interface OtpFormComponentProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleVerifyOtp: (e: React.FormEvent) => void;
  handleResendOtp: () => void;
  verifyError: boolean;
}

const OtpFormComponent: React.FC<OtpFormComponentProps> = ({
  otp,
  setOtp,
  handleVerifyOtp,
  handleResendOtp,
  verifyError,
}) => {
  return (
    <div>
      <form onSubmit={handleVerifyOtp}>
        <div>
          <InputField
            type="text"
            id="otp"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <Button type="submit">Verify OTP</Button>
      </form>
      {verifyError && (
        <Button onClick={handleResendOtp} className="resend">
          Resend OTP
        </Button>
      )}
    </div>
  );
};

export default OtpFormComponent;
