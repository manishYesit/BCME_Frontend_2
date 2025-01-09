"use client";
import React, { useState, useEffect, useRef } from "react";
import apiEndpoints from "../../../../config/apiEndpoints";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "primereact/toast";

export default function resetPassword() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Retrieve the token query parameter
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if(newPassword == confirmPassword){
        const response = await axios.post(apiEndpoints.resetPassword, {
          newPassword,
          token,
        });
        if (response.data.status) {
          // Redirect or perform other actions
          console.log("Login successful!");
          toast.current?.show({
            severity: "success",
            detail: "Password reset successfully! Redirecting to login page.",
            life: 3000,
          });

          setTimeout(() => {
            router.push(`/`);
          }, 2000);
        } else {
          toast.current?.show({
            severity: "error",
            detail: "Invalid or expired token.",
            life: 3000,
          });
        }
      } else {
        setError("Passwords did not match.")
      }
    } catch (err) {
      setError("Invalid or expired token");
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className="login-page">
        <h1><i className="fa-solid fa-building"></i> <span>BCme</span> Application</h1>
        <p>© Building Codes Made Eaiser</p>
        {/* RESET-PASSWORD-SECTION */}
        <div className="login-page-in reset-password retrieve-password">
          <div className="form">
            <h2><i className="fas fa-user-lock"></i> Reset Password</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <label>
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Create Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label>
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button type="submit">Submit</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
        {/* RESET-PASSWORD-SECTION */}
      </div >
      <Toast ref={toast} />
    </>
  );
}
