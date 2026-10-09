import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthSuccessModal from "../components/AuthSuccessModal";

function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage("");
  setSuccessMessage("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage("You’re signed in and ready to continue to your project space.");

      console.log("Logged in user:", data.user);

      // Save logged-in user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
    } else {
      setMessage(
        data.message || "Invalid email or password."
      );
    }
  } catch (error) {
    console.error("Login error:", error);

    setMessage(
      "Unable to connect to the server. Please make sure the backend is running."
    );
  }
};

  return (
    <div className="login-page">
      {successMessage && (
        <AuthSuccessModal
          message={successMessage}
          onClose={() => navigate("/services")}
        />
      )}
      <section className="login-visual">
        <div className="login-visual-image" role="img" aria-label="A contemporary home under construction" />
        <div className="login-visual-shade" />
        <Link className="login-visual-brand" to="/" aria-label="Worldwide Constructions home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span className="brand-name">WORLDWIDE<small>CONSTRUCTIONS</small></span>
        </Link>
        <div className="login-visual-copy">
          <p className="eyebrow light-eyebrow"><span /> Built on trust</p>
          <h1>Good things<br />are <em>taking shape.</em></h1>
          <p>A place for our clients and partners to stay connected to the work we build together.</p>
        </div>
        <div className="login-visual-footer">
          <span>BUILT WITH CARE, FROM THE GROUND UP</span>
          <span aria-hidden="true">WWC / 01</span>
        </div>
        <div className="login-visual-stamp" aria-hidden="true">
          <span>WORLDWIDE</span>
          <strong>✳</strong>
          <span>BUILT TOGETHER</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-panel-top">
          <Link className="login-back-link" to="/"><span aria-hidden="true">←</span> Back to website</Link>
          <span className="login-panel-mark" aria-hidden="true">WW</span>
        </div>

        <div className="login-card">
          <p className="eyebrow"><span /> Client & partner portal</p>
          <h2>Welcome<br /><em>back.</em></h2>
          <p className="login-intro">Sign in to continue to your project space.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                required
              />
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className="login-password-wrap">
                <input
                  autoComplete="current-password"
                  name="password"
                  placeholder="Enter your password"
                  type={passwordVisible ? "text" : "password"}
                  required
                />
                <button
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  aria-pressed={passwordVisible}
                  className="password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  type="button"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            <div className="login-options">
              <label className="remember-option">
                <input name="remember" type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="mailto:hello@northline.build?subject=Account%20access%20help">Forgot password?</a>
            </div>

            <button className="button button-accent login-submit" type="submit">
              Sign in <span aria-hidden="true">↗</span>
            </button>
            <p className="login-status" aria-live="polite" role="status">{message}</p>
          </form>

          <div className="login-divider"><span>NEW TO WORLDWIDE?</span></div>
          <p className="login-register">
            Need an account? <Link to="/registration">Create one <span aria-hidden="true">↗</span></Link>
          </p>
        </div>

        <div className="login-panel-footer">
          <span>© {new Date().getFullYear()} Worldwide Constructions</span>
          <Link to="/contact">Need a hand? Get in touch</Link>
        </div>
      </section>
    </div>
  );
}

export default Login;
