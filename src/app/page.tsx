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
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiEndpoints.loginUser, {
        email,
        password,
        type: "MANUAL",
      });
      if (response.data.status) {
        const { access_token } = response.data;
        // Save the token to Redux
        dispatch(setToken(access_token));
        localStorage.setItem("adminToken", access_token);

        // Redirect or perform other actions
        console.log("Login successful!");

        router.push(`/admin/dashboard`);
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-page">
      <h1><i className="fa-solid fa-building"></i> <span>BCme</span> Application</h1>
      <p>© Building Codes Made Eaiser</p>
      <div className="form">
        <h2><i className="fa-solid fa-mug-saucer"></i> Please Enter Your Information</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
    </div>
  );
}
