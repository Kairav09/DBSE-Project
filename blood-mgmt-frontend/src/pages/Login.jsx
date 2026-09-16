import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("donor");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username") || "User";
    
    localStorage.setItem("userName", username);
    
    const existingSub = localStorage.getItem("userSub");
    if (!existingSub) {
      localStorage.setItem("userSub", role === "donor" ? "O+ · Hyderabad" : role === "hospital" ? "Somajiguda" : "Blood Bank");
    }
    
    navigate(`/${role}`);
  }

  return (
    <div className="auth-split">
      {/* ── Left Panel — Branding ── */}
      <div className="auth-panel">
        <div className="auth-panel__bg">
          <div className="auth-panel__orb auth-panel__orb--1" />
          <div className="auth-panel__orb auth-panel__orb--2" />
          <div className="auth-panel__pulse-ring" />
        </div>
        <div className="auth-panel__content">
          <Link to="/home" className="auth-panel__brand">
            <span className="auth-panel__mark">+</span>
            <span>RaktaSetu</span>
          </Link>
          <h1 className="auth-panel__title">
            Every drop<br />counts.
          </h1>
          <p className="auth-panel__desc">
            Join the network that connects donors, hospitals, and blood banks — saving lives through smart matching and real-time inventory.
          </p>
          <div className="auth-panel__stats">
            <div><strong>1,284</strong><span>Donors</span></div>
            <div><strong>126</strong><span>Units</span></div>
            <div><strong>97%</strong><span>Match rate</span></div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="auth-form-panel">
        <div className="auth-form-panel__top">
          <span className="auth-form-panel__label">Don't have an account?</span>
          <Link to="/register" className="auth-btn-link">Register →</Link>
        </div>

        <div className="auth-form-wrapper">
          <h2 className="auth-form__title">Welcome back</h2>
          <p className="auth-form__subtitle">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Username or email address</label>
              <input type="text" name="username" placeholder="Username or you@example.com" required />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div className="auth-field">
              <label>Login as</label>
              <div className="auth-role-tabs">
                {[
                  { value: "donor", label: "Donor", icon: "🩸" },
                  { value: "hospital", label: "Hospital", icon: "🏥" },
                  { value: "admin", label: "Admin", icon: "⚙️" },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={"auth-role-tab" + (role === r.value ? " auth-role-tab--active" : "")}
                    onClick={() => setRole(r.value)}
                  >
                    <span className="auth-role-tab__icon">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="auth-submit" type="submit">Sign in</button>
          </form>

          <div className="auth-form__footer">
            <Link to="/home">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
