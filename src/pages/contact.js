import React, { useState } from "react";

function Contact() {
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          title: "Thank you for reaching out.",
          message:
            "Your project enquiry has been submitted successfully. We’ll be in touch soon.",
        });
        form.reset();
      } else {
        setNotification({
          type: "error",
          title: "We couldn’t send your enquiry.",
          message: data.message || "Please try again in a moment.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);

      setNotification({
        type: "error",
        title: "We couldn’t reach the server.",
        message:
          "Please make sure the server is running, then try sending your enquiry again.",
      });
    }
  };

  return (
    <div className="contact-page">
      {notification && (
        <div
          className="contact-notice-backdrop"
          onClick={() => setNotification(null)}
        >
          <section
            aria-describedby="contact-notice-message"
            aria-labelledby="contact-notice-title"
            aria-modal="true"
            className={`contact-notice contact-notice-${notification.type}`}
            onClick={(event) => event.stopPropagation()}
            role="alertdialog"
          >
            <button
              aria-label="Close notification"
              autoFocus
              className="contact-notice-close"
              onClick={() => setNotification(null)}
              type="button"
            >
              ×
            </button>
            <span aria-hidden="true" className="contact-notice-icon">
              {notification.type === "success" ? "✓" : "!"}
            </span>
            <span className="contact-notice-eyebrow">
              {notification.type === "success" ? "ENQUIRY RECEIVED" : "PLEASE NOTE"}
            </span>
            <h2 id="contact-notice-title">{notification.title}</h2>
            <p id="contact-notice-message">{notification.message}</p>
            <button
              className="contact-notice-action"
              onClick={() => setNotification(null)}
              type="button"
            >
              Got it
              <span aria-hidden="true">↗</span>
            </button>
          </section>
        </div>
      )}

      <section className="contact-page-hero">
        <div className="page-width contact-hero-inner">
          <p className="eyebrow">
            <span /> Your project starts here
          </p>

          <h1>
            Tell us what
            <br />
            you’re <em>imagining.</em>
          </h1>

          <p className="contact-hero-intro">
            A few details are all it takes to get the conversation going. No
            pressure, no hard sell—just a real person ready to listen.
          </p>

          <div className="contact-hero-note">
            <span className="contact-note-mark" aria-hidden="true">
              N.
            </span>

            <span>
              Good spaces start
              <br />
              with good conversations.
            </span>
          </div>
        </div>

        <span className="contact-hero-index" aria-hidden="true">
          LET’S BUILD / 01
        </span>
      </section>

      <section className="contact-form-section page-width">
        <aside className="contact-aside">
          <p className="eyebrow">
            <span /> The first step
          </p>

          <h2>
            Start with
            <br />
            <em>a hello.</em>
          </h2>

          <p className="contact-aside-copy">
            Whether you have a full set of plans or just a spark of an idea,
            we’d love to hear about it.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">EMAIL US</span>

              <a href="mailto:hello@northline.build">
                hello@northline.build
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">OUR APPROACH</span>

              <span>Thoughtful, personal, no pressure.</span>
            </div>
          </div>

          <div className="contact-aside-stamp">
            <span>01</span>

            <span>
              Listen first.
              <br />
              Build better.
            </span>

            <span aria-hidden="true">↗</span>
          </div>
        </aside>

        <div className="contact-form-wrap">
          <div className="form-heading">
            <span className="form-step">A QUICK INTRODUCTION</span>

            <span className="form-required">* REQUIRED</span>
          </div>

          <form className="project-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span>
                  Your name <b>*</b>
                </span>

                <input
                  autoComplete="name"
                  name="name"
                  placeholder="What should we call you?"
                  required
                />
              </label>

              <label className="form-field">
                <span>
                  Email address <b>*</b>
                </span>

                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Phone number</span>

                <input
                  autoComplete="tel"
                  name="phone"
                  type="tel"
                  placeholder="If you’d prefer a call"
                />
              </label>

              <label className="form-field">
                <span>Where’s the project?</span>

                <input
                  autoComplete="address-level2"
                  name="location"
                  placeholder="Suburb or town"
                />
              </label>
            </div>

            <label className="form-field">
              <span>
                What are you thinking about? <b>*</b>
              </span>

              <select name="projectType" defaultValue="" required>
                <option value="" disabled>
                  Choose what feels closest
                </option>

                <option value="A custom home">A custom home</option>

                <option value="A renovation or extension">
                  A renovation or extension
                </option>

                <option value="A commercial project">
                  A commercial project
                </option>

                <option value="Something else">Something else</option>
              </select>
            </label>

            <div className="form-row">
              <label className="form-field">
                <span>Approximate budget</span>

                <select name="budget" defaultValue="">
                  <option value="">We’re still figuring it out</option>

                  <option value="Under $250,000">
                    Under $250,000
                  </option>

                  <option value="$250,000–$500,000">
                    $250,000–$500,000
                  </option>

                  <option value="$500,000–$1,000,000">
                    $500,000–$1,000,000
                  </option>

                  <option value="$1,000,000+">
                    $1,000,000+
                  </option>
                </select>
              </label>

              <label className="form-field">
                <span>When would you like to start?</span>

                <select name="timeline" defaultValue="">
                  <option value="">We’re flexible</option>

                  <option value="As soon as possible">
                    As soon as possible
                  </option>

                  <option value="In 3–6 months">
                    In 3–6 months
                  </option>

                  <option value="In 6–12 months">
                    In 6–12 months
                  </option>

                  <option value="Just exploring">
                    Just exploring
                  </option>
                </select>
              </label>
            </div>

            <label className="form-field form-message">
              <span>
                A little about your project <b>*</b>
              </span>

              <textarea
                name="message"
                placeholder="What are you hoping to create? Share as much or as little as you like."
                rows="4"
                required
              />
            </label>

            <div className="form-submit-row">
              <p>
                Your details stay with us. We’ll only use them to reply to your
                enquiry.
              </p>

              <button
                className="button button-accent form-submit"
                type="submit"
              >
                Send your project brief{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            <p className="form-mail-note">
              Your enquiry will be securely submitted to our team.
            </p>
          </form>
        </div>
      </section>

      <section className="contact-signoff">
        <div className="page-width contact-signoff-inner">
          <span>NO PLANS YET? NO PROBLEM.</span>

          <p>
            The best projects can start with{" "}
            <em>“I’ve been thinking...”</em>
          </p>

          <a href="mailto:hello@northline.build">
            hello@northline.build{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Contact;