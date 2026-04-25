import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        // Redirect to login page after 1.5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section — Benefits */}
          <div className="col-lg-6 signup-left">
            <h1>Open a free demat & trading account</h1>
            <p className="tagline">
              Join millions of Indians who trust Zerodha for their investments.
              Start your journey with zero account opening fees.
            </p>

            <ul className="signup-features">
              <li>
                <span className="feature-icon">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                </span>
                <div>
                  <strong>₹0 account opening fees</strong>
                  <br />
                  Free equity delivery trades and direct mutual funds.
                </div>
              </li>
              <li>
                <span className="feature-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </span>
                <div>
                  <strong>Advanced charting tools</strong>
                  <br />
                  Trade with powerful charts, 100+ indicators on Kite.
                </div>
              </li>
              <li>
                <span className="feature-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </span>
                <div>
                  <strong>Secure & regulated</strong>
                  <br />
                  Registered with SEBI, NSE, BSE & CDSL. Your funds are safe.
                </div>
              </li>
              <li>
                <span className="feature-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                <div>
                  <strong>Free learning resources</strong>
                  <br />
                  Learn from Varsity — India's largest stock market education platform.
                </div>
              </li>
            </ul>
          </div>

          {/* Right Section — Signup Form */}
          <div className="col-lg-5 offset-lg-1">
            <div className="signup-card">
              <h2>Create your account</h2>
              <p className="subtitle">It only takes a minute to get started</p>

              {error && (
                <div className="alert alert-danger signup-alert" role="alert">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success signup-alert" role="alert">
                  <i className="fa-solid fa-circle-check me-2"></i>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="signupUsername"
                    name="username"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="signupUsername">Full Name</label>
                </div>

                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="signupEmail"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="signupEmail">Email Address</label>
                </div>

                <div className="form-floating password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="signupPassword"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="signupPassword">Password</label>
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>

                <div className="form-floating password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="signupConfirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="signupConfirmPassword">Confirm Password</label>
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                  >
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn-signup"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Creating account...
                    </>
                  ) : (
                    "Sign up for free"
                  )}
                </button>
              </form>

              <div className="signup-divider">
                <span>or</span>
              </div>

              <p className="login-prompt">
                Already have an account?{" "}
                <Link to="/login">Log in</Link>
              </p>

              <p className="terms-text">
                By signing up, you agree to our{" "}
                <a href="https://zerodha.com/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="https://zerodha.com/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;