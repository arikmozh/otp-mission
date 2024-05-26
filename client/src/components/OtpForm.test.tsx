import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import OtpForm from "./OtpForm";

jest.mock("axios");

describe("OtpForm", () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockClear();
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

    await waitFor(() =>
      expect(screen.getByText("OTP sent")).toBeInTheDocument()
    );
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

    await waitFor(() =>
      expect(screen.getByText("OTP sent")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText("Enter the OTP"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Verify OTP"));

    await waitFor(() =>
      expect(
        screen.getByText((content, element) => {
          return (
            element?.textContent ===
            "Your email test@example.com has been successfully verified!"
          );
        })
      ).toBeInTheDocument()
    );
    expect(screen.getByText("Verify Another Email")).toBeInTheDocument();
  });
});
