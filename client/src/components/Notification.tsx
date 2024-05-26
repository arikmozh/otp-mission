import React from "react";
import Button from "./Button";

interface NotificationProps {
  message: string;
  color: string;
  email?: string;
  handleResetForm?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  color,
  email,
  handleResetForm,
}) => (
  <div style={{ textAlign: "center" }}>
    <p className="message" style={{ color }}>
      {email ? (
        <>
          Your email <span style={{ color: "#4f46e5" }}>{email}</span> has been
          successfully verified!
        </>
      ) : (
        message
      )}
    </p>
    {email && handleResetForm && (
      <Button onClick={handleResetForm} className="reset">
        Verify Another Email
      </Button>
    )}
  </div>
);

export default Notification;
