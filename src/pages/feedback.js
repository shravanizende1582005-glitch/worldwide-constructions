import React, { useState } from "react";

const appreciationOptions = [
  "Great communication",
  "Beautiful craftsmanship",
  "Kept things on track",
  "A team that listened",
  "Thoughtful problem-solving",
  "The little details",
];

function Feedback() {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [floatingPoints, setFloatingPoints] = useState({ value: 0, key: 0 });

  const toggleAppreciation = (option) => {
    const isSelected = selectedOptions.includes(option);

    setSelectedOptions((current) =>
      isSelected
        ? current.filter((item) => item !== option)
        : [...current, option]
    );

    setFloatingPoints((current) => ({
      value: isSelected ? -10 : 10,
      key: current.key + 1,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const feedbackData = {
      rating: rating,
      appreciationPoints:
        selectedOptions.join(", ") || "None selected",
      feedback: formData.get("feedback"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      
const response = await fetch(
  "https://worldwide-constructions.vercel.app/api/feedback",
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Thank you! Your feedback has been submitted successfully."
        );

        form.reset();

        setRating(0);
        setSelectedOptions([]);
        setFloatingPoints({
          value: 0,
          key: 0,
        });
      } else {
        alert(
          data.message || "Failed to submit your feedback."
        );
      }
    } catch (error) {
      console.error("Feedback submission error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  return (
    <div className="feedback-page">
      <section className="feedback-hero">
        <div
          className="feedback-orbit feedback-orbit-one"
          aria-hidden="true"
        />

        <div
          className="feedback-orbit feedback-orbit-two"
          aria-hidden="true"
        />

        <span
          className="floating-dot feedback-dot-one"
          aria-hidden="true"
        />

        <span
          className="floating-dot feedback-dot-two"
          aria-hidden="true"
        />

        <span
          className="floating-dot feedback-dot-three"
          aria-hidden="true"
        />

        <div className="page-width feedback-hero-inner">
          <p className="eyebrow light-eyebrow">
            <span /> A little note goes a long way
          </p>

          <h1>
            Good work is
            <br />
            <em>worth sharing.</em>
          </h1>

          <p className="feedback-hero-copy">
            Every project leaves us with something to learn. Tell us what
            stood out, what felt special, or what we could do better.
          </p>

          <a
            className="feedback-scroll-link"
            href="#share-feedback"
          >
            Share your thoughts{" "}
            <span aria-hidden="true">↓</span>
          </a>

          <div
            className="feedback-hero-seal"
            aria-hidden="true"
          >
            <span>
              BUILT
              <br />
              TOGETHER
            </span>

            <b>✳</b>
          </div>
        </div>
      </section>

      <section
        className="feedback-form-section page-width"
        id="share-feedback"
      >
        <aside className="feedback-aside">
          <p className="eyebrow">
            <span /> The human part
          </p>

          <h2>
            Your words
            <br />
            help us <em>grow.</em>
          </h2>

          <p>
            Whether you’ve built with us, worked alongside us, or just
            visited a project, your perspective matters.
          </p>

          <div className="feedback-aside-note">
            <span
              className="feedback-note-icon"
              aria-hidden="true"
            >
              ✳
            </span>

            <span>
              Real people.
              <br />
              Real projects.
              <br />
              <em>Always improving.</em>
            </span>
          </div>

          <div className="feedback-confidential">
            TAKES ABOUT 2 MINUTES <span>·</span> ALWAYS APPRECIATED
          </div>
        </aside>

        <form
          className="feedback-form"
          onSubmit={handleSubmit}
        >
          <div className="feedback-form-top">
            <span>01 — YOUR EXPERIENCE</span>
            <span>WE’RE LISTENING</span>
          </div>

          <fieldset className="rating-fieldset">
            <legend>
              How did we do? <b>*</b>
            </legend>

            <div className="rating-options">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  aria-pressed={rating === value}
                  aria-label={`${value} ${
                    value === 1 ? "star" : "stars"
                  }`}
                  className={`rating-button${
                    rating >= value ? " is-active" : ""
                  }`}
                  key={value}
                  onClick={() => setRating(value)}
                  type="button"
                >
                  <span aria-hidden="true">
                    {rating >= value ? "★" : "☆"}
                  </span>
                </button>
              ))}

              <span className="rating-hint">
                {rating
                  ? `${rating} out of 5`
                  : "Tap a star to rate"}
              </span>
            </div>
          </fieldset>

          <fieldset className="appreciation-fieldset">
            <legend>
              Give the good stuff some points{" "}
              <span>OPTIONAL</span>
            </legend>

            <p>
              Tap what made a difference. Every point floats into our
              team’s day.
            </p>

            <div className="appreciation-options">
              {appreciationOptions.map((option) => {
                const selected =
                  selectedOptions.includes(option);

                return (
                  <button
                    aria-pressed={selected}
                    className={`appreciation-chip${
                      selected ? " is-selected" : ""
                    }`}
                    key={option}
                    onClick={() =>
                      toggleAppreciation(option)
                    }
                    type="button"
                  >
                    <span aria-hidden="true">
                      {selected ? "✳" : "+"}
                    </span>{" "}
                    {option}
                  </button>
                );
              })}
            </div>

            <div
              className="points-counter"
              aria-live="polite"
            >
              <span
                className="points-counter-icon"
                aria-hidden="true"
              >
                ✳
              </span>

              <span>
                <strong>
                  {selectedOptions.length * 10}
                </strong>{" "}
                appreciation points
              </span>

              {floatingPoints.key > 0 && (
                <span
                  className={`floating-points${
                    floatingPoints.value < 0
                      ? " is-subtracting"
                      : ""
                  }`}
                  key={floatingPoints.key}
                >
                  {floatingPoints.value > 0 ? "+10" : "−10"}
                </span>
              )}
            </div>
          </fieldset>

          <label className="feedback-field">
            <span>
              Anything you’d like us to know? <b>*</b>
            </span>

            <textarea
              name="feedback"
              placeholder="A moment you remember, something we got right, or something we could do better..."
              rows="5"
              required
            />
          </label>

          <div className="feedback-identity-row">
            <label className="feedback-field">
              <span>
                Your name <small>OPTIONAL</small>
              </span>

              <input
                name="name"
                placeholder="Name"
                autoComplete="name"
              />
            </label>

            <label className="feedback-field">
              <span>
                Email <small>OPTIONAL</small>
              </span>

              <input
                name="email"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </label>
          </div>

          <div className="feedback-submit-row">
            <p>
              We read every note. Your feedback helps us build better.
            </p>

            <button
              className="button button-accent feedback-submit"
              type="submit"
              disabled={!rating}
            >
              Send feedback{" "}
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <p className="feedback-mail-note">
            Your feedback will be securely submitted to our team.
          </p>
        </form>
      </section>

      <section className="feedback-footer-note">
        <div className="page-width">
          <span aria-hidden="true">✳</span>

          <p>
            Thanks for helping us make{" "}
            <em>good work even better.</em>
          </p>

          <span className="feedback-footer-caption">
            WORLDWIDE CONSTRUCTIONS / BUILT TOGETHER
          </span>
        </div>
      </section>
    </div>
  );
}

export default Feedback;