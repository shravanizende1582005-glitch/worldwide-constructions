import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Custom homes",
    description: "Personal spaces, considered down to the last detail and built around the way you live.",
    icon: "⌂",
  },
  {
    number: "02",
    title: "Renovations",
    description: "A thoughtful new chapter for the home you already love, with care for what came before.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Commercial",
    description: "Distinctive, hard-working spaces that help good businesses do their best work.",
    icon: "▤",
  },
];

const steps = [
  ["01", "First conversation", "We listen, learn what matters, and get clear on your vision."],
  ["02", "Plan with purpose", "A practical scope, honest budget, and a plan you can feel good about."],
  ["03", "Build with care", "One dependable team, clear updates, and craftsmanship at every step."],
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-image" role="img" aria-label="Modern timber and concrete home surrounded by trees" />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <p className="eyebrow light-eyebrow"><span /> Built around what matters</p>
          <h1>Grounded in craft.<br /><em>Made for living.</em></h1>
          <p className="hero-copy">
            We bring considered design and honest craftsmanship together to make places that feel like yours.
          </p>
          <div className="hero-actions">
            <Link className="button button-accent" to="/contact">Let’s build something <span aria-hidden="true">↗</span></Link>
            <Link className="text-link light-link" to="/services">Explore our services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            <span>Thoughtful construction<br />from ground up</span>
          </div>
        </div>
        <div className="hero-index"><span>01</span> / 03</div>
      </section>

      <section className="intro-section page-width">
        <div className="intro-label eyebrow"><span /> Worldwide, in a nutshell</div>
        <div className="intro-copy">
          <h2>Good building is about more than what you see. <em>It’s how it feels to be there.</em></h2>
          <div className="intro-bottom">
            <p>
              From first sketch to final handover, we make the building process feel clear, collaborative, and genuinely rewarding.
            </p>
            <Link className="text-link" to="/services">A little more about what we do <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> What we do</p>
              <h2>Built around <em>your next.</em></h2>
            </div>
            <Link className="text-link" to="/services">View all services <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">{service.number} / 03</span>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" aria-label={`Learn about ${service.title}`} className="card-link">Learn more <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-feature">
        <div className="project-image" role="img" aria-label="Warm contemporary house with carefully crafted timber details" />
        <div className="project-copy">
          <p className="eyebrow light-eyebrow"><span /> The Worldwide difference</p>
          <h2>Small details.<br /><em>Lasting difference.</em></h2>
          <p>
            We’re a close-knit team who believe doing it properly is the only way. That means considered choices, trusted trades, and no surprises along the way.
          </p>
          <Link className="text-link light-link" to="/services">Get to know our approach <span aria-hidden="true">↗</span></Link>
          <div className="project-caption"><span>01 — Craft you can feel</span><span>Built with intention</span></div>
        </div>
      </section>

      <section className="process-section page-width">
        <div className="process-heading">
          <p className="eyebrow"><span /> A better way to build</p>
          <h2>Clear from<br /><em>day one.</em></h2>
          <p className="process-lead">The best projects start with trust. Here’s how we build it.</p>
        </div>
        <div className="process-steps">
          {steps.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner page-width">
          <p className="eyebrow light-eyebrow"><span /> Have a project in mind?</p>
          <div className="contact-row">
            <h2>Let’s make<br /><em>it happen.</em></h2>
            <div className="contact-action">
              <p>Tell us what you’re dreaming up. We’d love to hear about it.</p>
              <Link className="button button-accent" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="contact-bottom"><span>Good things start with a hello.</span><a href="mailto:hello@northline.build">hello@northline.build</a></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
