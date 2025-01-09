"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/reducers/authSlice";
import apiEndpoints from "../../config/apiEndpoints";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState(0);
  const [otpContext, setOtpContext] = useState(""); // Tracks the purpose of OTP verification
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [section, setSection] = useState("login"); // Tracks current section
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiEndpoints.loginUser, {
        email,
        password,
        type: "MANUAL",
      });
      if (response.data.status) {
        const { otp } = response.data;
        setReceivedOtp(otp); // Store OTP from API
        setOtpContext("login"); // Set OTP context to login
        setSection("otpVerification"); // Navigate to OTP verification section
        const { access_token } = response.data;
        setAccessToken(access_token);
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login failed:", err);
    }
  };

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiEndpoints.forgotPassword, { email });
      if (response.data.status) {
        setReceivedOtp(response.data.otp); // Store OTP from API
      }
    } catch (err) {
      setError("Error sending OTP");
    }
  };

  const handleOtpVerification = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (parseInt(otp) === receivedOtp) {
      if (otpContext === "login") {
        // Save the token to Redux
        dispatch(setToken(accessToken));
        localStorage.setItem("adminToken", accessToken);

        // Redirect or perform other actions
        console.log("Login successful!");

        router.push(`/admin/dashboard`);
      }
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="login-page">
      <h1><i className="fa-solid fa-building"></i> <span>BCme</span> Application</h1>
      <p>© Building Codes Made Eaiser</p>
      {/* LOGIN-SECTION */}
      {section === "login" && (
        <div className="login-page-in admin-login">
          <div className="form">
            <h2><i className="fa-solid fa-mug-saucer"></i> Please Enter Your Information</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <label>
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit"><i className="fa-solid fa-key"></i> login</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
          <a href="javascript:void(0);" className="bottom-btn go-forgot" onClick={() => setSection("forgotPassword")}><i className="fas fa-arrow-left"></i> I forgot my password</a>
        </div>
      )}
      {/* LOGIN-SECTION */}
      {/* RETRIEVE-PASSWORD-SECTION */}
      {section === "forgotPassword" && (
        <div className="login-page-in retrieve-password">
          <div className="form">
            <h2><i className="fa-solid fa-key"></i> Retrieve Password</h2>
            <form className="login-form" onSubmit={handleForgotPassword}>
              <span className="lbl-text">Enter your email and to receive instructions</span>
              <label>
                <i className="fa-solid fa-envelope"></i>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <button type="submit"><i className="fas fa-lightbulb"></i> Send Me</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
          <a href="javascript:void(0);" className="bottom-btn go-login justify-content-center" onClick={() => setSection("login")}><i className="fas fa-arrow-left"></i>Back to login</a>
        </div>
      )}
      {/* RETRIEVE-PASSWORD-SECTION */}
      {/* OTP-VERIFICATION-SECTION */}
      {section === "otpVerification" && (
        <div className="login-page-in otp-verify retrieve-password">
          <div className="form">
            <h2><i className="fas fa-user-check"></i> Verification Code</h2>
            <form className="login-form" onSubmit={handleOtpVerification}>
              <label>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e:any) => setOtp(e.target.value)} />
              </label>
              <button type="submit">Verify</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      )}
      {/* OTP-VERIFICATION-SECTION */}
    </div >
  );
}
