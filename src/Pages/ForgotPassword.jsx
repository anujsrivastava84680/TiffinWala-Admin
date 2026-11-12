
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import "./CSS/ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    const registeredEmail = adminUser.email || "admin@example.com";

    if (!email.trim()) {
      setError("Please enter your registered admin email.");
      return;
    }

    if (email.trim().toLowerCase() !== registeredEmail.toLowerCase()) {
      setError("This email is not registered as an admin account.");
      return;
    }

    setVerified(true);
    setError("");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    localStorage.setItem("adminPassword", newPassword);
    setSuccess("Password reset successfully! You can now login.");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="admin-forgot-page">
      <div className="admin-forgot-card">
        <div className="admin-forgot-brand">
          <div className="admin-forgot-logo">
            <FaUserShield />
          </div>
          <h2>Tiffin<span>Wala</span></h2>
          <p>ADMIN PANEL</p>
        </div>

        <div className="admin-forgot-heading">
          <h1>{verified ? "Create New Password" : "Forgot Password?"}</h1>
          <p>
            {verified
              ? "Enter your new password and confirm it below."
              : "Enter your registered admin email to continue."}
          </p>
        </div>

        {!verified ? (
          <form onSubmit={handleVerifyEmail}>
            <div className="admin-forgot-field">
              <label>Admin Email Address</label>
              <div className="admin-forgot-input">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="admin-forgot-error">{error}</div>}

            <button type="submit" className="admin-forgot-submit">
              Verify Email <FaArrowRight />
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="admin-forgot-field">
              <label>New Password</label>
              <div className="admin-forgot-input">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="admin-forgot-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="admin-forgot-field">
              <label>Confirm New Password</label>
              <div className="admin-forgot-input">
                <FaLock />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="admin-forgot-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <div className="admin-forgot-error">{error}</div>}
            {success && <div className="admin-forgot-success">{success}</div>}

            <button type="submit" className="admin-forgot-submit">
              Reset Password <FaArrowRight />
            </button>
          </form>
        )}

        <Link to="/login" className="admin-forgot-back">
          <FaArrowLeft /> Back to Login
        </Link>

        <div className="admin-forgot-note">
          Demo account: admin@example.com
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
