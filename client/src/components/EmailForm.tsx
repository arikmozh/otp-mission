import React from "react";
import InputField from "./InputField";
import Button from "./Button";

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleSendOtp: (e: React.FormEvent) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({
  email,
  setEmail,
  handleSendOtp,
}) => (
  <form onSubmit={handleSendOtp}>
    <div>
      <InputField
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <Button type="submit">Send OTP</Button>
  </form>
);

export default EmailForm;
