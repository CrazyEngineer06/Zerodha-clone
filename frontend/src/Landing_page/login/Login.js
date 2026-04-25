import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage for the dashboard to pick up
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to the dashboard app
        window.location.href = "http://localhost:3001";
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section — Branding */}
          <div className="col-lg-6 login-left">
            <h1>Welcome back to Zerodha</h1>
            <p className="tagline">
              Log in to your Kite dashboard to manage your portfolio,
              track investments, and execute trades seamlessly.
            </p>

            <img
              src="/Media/kite.png"
              alt="Kite Trading Platform"
              className="kite-img"
            />

            <div className="trust-badges">
              <div className="trust-badge">
                <i className="fa-solid fa-users"></i>
                <div>
                  <strong>1.5 Cr+</strong>
                  <span>Active clients</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fa-solid fa-arrow-trend-up"></i>
                <div>
                  <strong>₹4.5L Cr+</strong>
                  <span>Daily turnover</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fa-solid fa-award"></i>
                <div>
                  <strong>#1</strong>
                  <span>Broker in India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section — Login Form */}
          <div className="col-lg-5 offset-lg-1">
            <div className="login-card">
              <h2>Log in to your account</h2>
              <p className="subtitle">Enter your credentials to continue</p>

              {error && (
                <div className="alert alert-danger login-alert" role="alert">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="loginEmail">Email Address</label>
                </div>

                <div className="form-floating password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="loginPassword"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="loginPassword">Password</label>
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              <div className="login-divider">
                <span>or</span>
              </div>

              <p className="signup-prompt">
                Don't have an account?{" "}
                <Link to="/signup">Sign up for free</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
