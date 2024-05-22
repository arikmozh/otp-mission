import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import OtpForm from "./OtpForm";

jest.mock("axios");

describe("OtpForm", () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockClear();
  });

  it("renders OTP generator header", () => {
    render(<OtpForm />);
    expect(screen.getByText("OTP GENERATOR")).toBeInTheDocument();
  });

  it("renders email input and submit button", () => {
    render(<OtpForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByText("Send OTP")).toBeInTheDocument();
  });

  it("sends OTP and shows verification form", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "OTP sent" },
    });

    render(<OtpForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Send OTP"));

    await screen.findByText("OTP sent");
    expect(screen.getByPlaceholderText("Enter the OTP")).toBeInTheDocument();
    expect(screen.getByText("Verify OTP")).toBeInTheDocument();
  });

  it("verifies OTP and shows success message", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "OTP sent" },
    });
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "OTP verified" },
    });

    render(<OtpForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Send OTP"));

    await screen.findByText("OTP sent");

    fireEvent.change(screen.getByPlaceholderText("Enter the OTP"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Verify OTP"));

    await screen.findByText("OTP verified");
    expect(screen.getByText(/Your email/)).toBeInTheDocument();
    expect(
      screen.getByText(/has been successfully verified!/)
    ).toBeInTheDocument();
    expect(screen.getByText("Verify Another Email")).toBeInTheDocument();
  });

  it("handles verification error and shows resend button", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "OTP sent" },
    });
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Error verifying OTP")
    );

    render(<OtpForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Send OTP"));

    await screen.findByText("OTP sent");

    fireEvent.change(screen.getByPlaceholderText("Enter the OTP"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Verify OTP"));

    await screen.findByText("Error verifying OTP");
    expect(screen.getByText("Resend OTP")).toBeInTheDocument();

    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "OTP sent" },
    });

    fireEvent.click(screen.getByText("Resend OTP"));

    await screen.findByText("OTP sent");
  });
});
