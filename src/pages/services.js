import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Custom homes",
    description: "A home should feel like it could only belong to you. We work closely with you and your design team to bring that feeling to life, with thoughtful planning and the kind of craftsmanship that stands the test of time.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Light-filled contemporary home with natural materials",
    details: ["New builds", "Architect-led projects", "Design and build"],
  },
  {
    number: "02",
    title: "Renovations & extensions",
    description: "Make more of the place you call home. From a considered refresh to a full transformation, we bring new life to existing spaces while respecting the character that makes them yours.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    alt: "Warm, carefully renovated living space",
    details: ["Whole-home renovations", "Extensions", "Interior transformations"],
  },
  {
    number: "03",
    title: "Commercial spaces",
    description: "A well-built space makes a difference to the people who use it every day. We deliver considered, practical environments that reflect your business and are ready to work as hard as you do.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Bright modern commercial workspace",
    details: ["Workplaces", "Retail and hospitality", "Fit-outs"],
  },
];

function Services() {
  return (
    <div className="services-page">
      <section className="services-hero page-width">
        <p className="eyebrow"><span /> How we can help</p>
        <h1>Built for the<br /><em>way you live.</em></h1>
        <div className="services-hero-bottom">
          <p>From a first home to a fresh start for your business, we bring care, clarity, and considered craft to every project.</p>
          <a className="text-link" href="#our-services">Explore our services <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="service-list" id="our-services">
        {services.map((service, index) => (
          <article className={`service-detail${index % 2 ? " reverse" : ""}`} key={service.number}>
            <div className="service-detail-image">
              <img src={service.image} alt={service.alt} loading="lazy" />
              <span className="image-index">{service.number} — 03</span>
            </div>
            <div className="service-detail-copy">
              <p className="eyebrow"><span /> Worldwide services</p>
              <h2>{service.title}</h2>
              <p className="detail-description">{service.description}</p>
              <ul>
                {service.details.map((detail) => <li key={detail}><span aria-hidden="true">↗</span>{detail}</li>)}
              </ul>
              <Link className="text-link" to="/contact">Talk to us about your project <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="services-cta">
        <div className="page-width services-cta-inner">
          <p className="eyebrow light-eyebrow"><span /> Your idea, our craft</p>
          <h2>Not sure where<br /><em>to begin?</em></h2>
          <p>That’s what the first conversation is for. Tell us what you have in mind and we’ll take it from there.</p>
          <Link className="button button-accent" to="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
