
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import "./CSS/Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();
  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Please enter email and password.");
    return;
  }

 const savedPassword = localStorage.getItem("adminPassword") || "Admin@123";

if (
  email.trim().toLowerCase() === "admin@example.com" &&
  password === savedPassword
) {
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        name: "Super Admin",
        email: "admin@example.com",
      })
    );

    navigate("/dashboard");
  } else {
    setError("Invalid email or password.");
  }
};

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        <div className="admin-login-left">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <FaUserShield />
            </div>
            <span>Tiffin<span>Wala</span></span>
          </div>

          <div className="admin-login-content">
            <span className="admin-welcome-tag">
              <FaShieldAlt /> ADMIN CONTROL PANEL
            </span>

            <h1>
              Manage Your
              <span> Marketplace</span>
            </h1>

            <p>
              One powerful dashboard to manage customers,
              home chefs, orders and your entire TiffinWala platform.
            </p>

            <div className="admin-feature-list">
              <div>✓ Manage Customers & HomeChefs</div>
              <div>✓ Monitor Orders & Payments</div>
              <div>✓ Control Your Marketplace</div>
            </div>
          </div>

          <div className="admin-login-footer">
            © 2026 TiffinWala. All rights reserved.
          </div>
        </div>

        <div className="admin-login-right">
          <div className="admin-login-form-wrapper">
            <div className="admin-mobile-logo">
              <FaUserShield /> TiffinWala Admin
            </div>

            <div className="admin-form-heading">
              <span>WELCOME BACK</span>
              <h2>Admin Login</h2>
              <p>Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="admin-input-group">
                <label>Email Address</label>
                <div className="admin-input-box">
                  <FaEnvelope />
                  <input
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label>Password</label>
                <div className="admin-input-box">
                  <FaLock />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="admin-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="admin-login-options">
                <label className="admin-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>

                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              {error && <div className="admin-login-error">{error}</div>}

              <button type="submit" className="admin-login-btn">
                Sign In <FaArrowRight />
              </button>
            </form>

            <div className="admin-demo-info">
              <strong>Demo Login Credentials</strong>
              <p>Email: admin@example.com</p>
              <p>Password: Admin@123</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
