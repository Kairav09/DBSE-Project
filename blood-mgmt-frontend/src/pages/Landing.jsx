import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Landing.css";

const features = [
  { icon: "🩸", title: "Blood Inventory", desc: "FEFO-aware stock tracking with expiry alerts and real-time unit counts across all blood groups." },
  { icon: "🚨", title: "Emergency Requests", desc: "Critical requests trigger instant donor matching and SMS notifications within minutes." },
  { icon: "🤝", title: "Donor Matching", desc: "Location-based matching ranks eligible donors by proximity, eligibility, and availability." },
  { icon: "🤖", title: "AI Demand Prediction", desc: "Time-series forecasting flags shortage risk before it becomes critical using historical data." },
  { icon: "🔬", title: "Cross-Match Records", desc: "ABO/Rh compatibility testing logs for every donor-recipient pair with full audit trail." },
  { icon: "🏕️", title: "Camp Management", desc: "Schedule donation drives, track RSVPs, and measure camp yield across the city." },
];

const stats = [
  { value: "1,284", label: "Registered Donors" },
  { value: "126", label: "Units in Stock" },
  { value: "6.4h", label: "Avg. Fulfillment" },
  { value: "97%", label: "Match Success" },
];

const steps = [
  { num: "01", title: "Register", desc: "Donors sign up with blood group, location, and medical eligibility in under 2 minutes." },
  { num: "02", title: "Request & Match", desc: "Hospitals raise requests. Our system auto-matches nearby eligible donors ranked by proximity." },
  { num: "03", title: "Deliver & Track", desc: "Cross-match testing, dispatch tracking, and fulfillment confirmation — all in one flow." },
];

export default function Landing() {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("land-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="land">
      {/* ── Sticky Navbar ── */}
      <nav className="land-nav">
        <div className="land-nav__inner">
          <Link to="/" className="land-nav__brand">
            <span className="land-nav__mark">+</span>
            <span className="land-nav__name">RaktaSetu</span>
          </Link>
          <div className="land-nav__links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div className="land-nav__actions">
            <Link to="/login" className="land-btn land-btn--ghost">Sign in</Link>
            <Link to="/register" className="land-btn land-btn--solid">Register</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="land-hero">
        <div className="land-hero__bg">
          <div className="land-hero__orb land-hero__orb--1" />
          <div className="land-hero__orb land-hero__orb--2" />
          <div className="land-hero__orb land-hero__orb--3" />
          <div className="land-hero__pulse" />
        </div>
        <div className="land-hero__content">
          <div className="land-hero__badge">Smart Blood Management System</div>
          <h1 className="land-hero__title">
            The right blood,<br />
            <span className="land-hero__accent">to the right patient,</span><br />
            before it's too late.
          </h1>
          <p className="land-hero__desc">
            RaktaSetu bridges the gap between donors, hospitals, and blood banks with real-time inventory,
            intelligent matching, and AI-powered demand forecasting.
          </p>
          <div className="land-hero__cta">
            <Link to="/register" className="land-btn land-btn--solid land-btn--lg">Get started — it's free</Link>
            <Link to="/login" className="land-btn land-btn--glass land-btn--lg">Sign in →</Link>
          </div>
        </div>
        <div className="land-hero__scroll-hint">
          <span>Scroll to explore</span>
          <div className="land-hero__scroll-arrow" />
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="land-stats" ref={addRef}>
        {stats.map((s) => (
          <div key={s.label} className="land-stats__item">
            <div className="land-stats__value">{s.value}</div>
            <div className="land-stats__label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Features Section ── */}
      <section className="land-section" id="features" ref={addRef}>
        <div className="land-section__header">
          <span className="land-section__tag">Features</span>
          <h2>Everything you need to manage blood, intelligently.</h2>
          <p>Six core modules working together to eliminate shortages and save lives.</p>
        </div>
        <div className="land-features-grid">
          {features.map((f) => (
            <div key={f.title} className="land-feature-card" ref={addRef}>
              <span className="land-feature-card__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="land-section land-section--dark" id="how-it-works" ref={addRef}>
        <div className="land-section__header">
          <span className="land-section__tag">How it works</span>
          <h2>From registration to transfusion — in three steps.</h2>
        </div>
        <div className="land-steps">
          {steps.map((s, i) => (
            <div key={s.num} className="land-step" ref={addRef}>
              <div className="land-step__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="land-step__connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboards CTA ── */}
      <section className="land-section" ref={addRef}>
        <div className="land-section__header">
          <span className="land-section__tag">Dashboards</span>
          <h2>Three dedicated portals. One unified system.</h2>
          <p>Each role gets a tailored experience designed for their workflow.</p>
        </div>
        <div className="land-roles-grid">
          {[
            { key: "donor", label: "Donor Portal", desc: "Track eligibility, respond to emergencies, discover nearby camps, and manage your donation history.", path: "/donor", color: "var(--crimson)" },
            { key: "hospital", label: "Hospital Portal", desc: "Raise blood requests, track fulfillment stages, search live inventory, and confirm deliveries.", path: "/hospital", color: "var(--navy)" },
            { key: "admin", label: "Admin Portal", desc: "Manage stock, match donors, run cross-match tests, schedule camps, and review AI forecasts.", path: "/admin", color: "var(--crimson-dark)" },
          ].map((r) => (
            <button key={r.key} className="land-role-card" onClick={() => navigate(r.path)}>
              <div className="land-role-card__bar" style={{ background: r.color }} />
              <h3>{r.label}</h3>
              <p>{r.desc}</p>
              <span className="land-role-card__link">Enter dashboard →</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="land-footer">
        <div className="land-footer__inner">
          <div className="land-footer__brand">
            <span className="land-nav__mark">+</span>
            <span>RaktaSetu</span>
          </div>
          <p>DBMS Course Project · Built with React, Node.js, Express & MySQL</p>
        </div>
      </footer>
    </div>
  );
}
