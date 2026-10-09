import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthSuccessModal from "../components/AuthSuccessModal";

function Registration() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Check passwords
    if (password !== confirmPassword) {
      setMessage(
        "Those passwords don’t match yet. Please check and try again."
      );
      return;
    }

    try {
      const response = await fetch(
  "https://worldwide-constructions.vercel.app/api/auth/register",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }
);
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your account has been created. You can now sign in and stay close to your project.");

        form.reset();
        setPasswordVisible(false);
      } else {
        setMessage(
          data.message || "Failed to create your account."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  return (
    <div className="login-page registration-page">
      {successMessage && (
        <AuthSuccessModal
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      <section className="login-visual registration-visual">
        <div
          className="login-visual-image"
          role="img"
          aria-label="A contemporary home surrounded by trees"
        />

        <div className="login-visual-shade" />

        <Link
          className="login-visual-brand"
          to="/"
          aria-label="Worldwide Constructions home"
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>

          <span className="brand-name">
            WORLDWIDE
            <small>CONSTRUCTIONS</small>
          </span>
        </Link>

        <div className="login-visual-copy">
          <p className="eyebrow light-eyebrow">
            <span /> Every great project
          </p>

          <h1>
            Starts with
            <br />
            <em>being here.</em>
          </h1>

          <p>
            Create your Worldwide account to keep your project
            conversations and updates close at hand.
          </p>
        </div>

        <div className="login-visual-footer">
          <span>ONE GOOD IDEA. ONE GREAT TEAM.</span>

          <span aria-hidden="true">WWC / 02</span>
        </div>

        <div
          className="login-visual-stamp"
          aria-hidden="true"
        >
          <span>WORLDWIDE</span>

          <strong>✳</strong>

          <span>BUILT TOGETHER</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-panel-top">
          <Link
            className="login-back-link"
            to="/"
          >
            <span aria-hidden="true">←</span> Back to website
          </Link>

          <span
            className="login-panel-mark"
            aria-hidden="true"
          >
            WW
          </span>
        </div>

        <div className="login-card registration-card">
          <p className="eyebrow">
            <span /> Join the project
          </p>

          <h2>
            Make yourself
            <br />
            <em>at home.</em>
          </h2>

          <p className="login-intro">
            Create an account to stay in the loop with Worldwide.
          </p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <label className="login-field">
              <span>Your name</span>

              <input
                autoComplete="name"
                name="name"
                placeholder="What should we call you?"
                required
              />
            </label>

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
              <span>Create a password</span>

              <span className="login-password-wrap">
                <input
                  autoComplete="new-password"
                  minLength="8"
                  name="password"
                  placeholder="At least 8 characters"
                  type={
                    passwordVisible
                      ? "text"
                      : "password"
                  }
                  required
                />

                <button
                  aria-label={
                    passwordVisible
                      ? "Hide passwords"
                      : "Show passwords"
                  }
                  aria-pressed={passwordVisible}
                  className="password-toggle"
                  onClick={() =>
                    setPasswordVisible(
                      !passwordVisible
                    )
                  }
                  type="button"
                >
                  {passwordVisible
                    ? "Hide"
                    : "Show"}
                </button>
              </span>
            </label>

            <label className="login-field">
              <span>Confirm password</span>

              <input
                autoComplete="new-password"
                minLength="8"
                name="confirmPassword"
                placeholder="Enter your password again"
                type={
                  passwordVisible
                    ? "text"
                    : "password"
                }
                required
              />
            </label>

            <button
              className="button button-accent login-submit"
              type="submit"
            >
              Create account{" "}
              <span aria-hidden="true">↗</span>
            </button>

            <p
              className="login-status"
              aria-live="polite"
              role="status"
            >
              {message}
            </p>
          </form>

          <div className="login-divider">
            <span>ALREADY WITH US?</span>
          </div>

          <p className="login-register">
            Welcome back?{" "}
            <Link to="/login">
              Sign in{" "}
              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </p>
        </div>

        <div className="login-panel-footer">
          <span>
            © {new Date().getFullYear()} Worldwide Constructions
          </span>

          <Link to="/contact">
            Need a hand? Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Registration;