import "./UI.css";

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, tone }) {
  return (
    <div className={"stat-card" + (tone ? ` stat-card--${tone}` : "")}>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

const TONE_MAP = {
  Critical: "critical",
  Urgent: "warning",
  Warning: "warning",
  Routine: "neutral",
  Pending: "neutral",
  Matching: "warning",
  Matched: "info",
  Fulfilled: "success",
  Completed: "success",
};

export function Badge({ children }) {
  const tone = TONE_MAP[children] || "neutral";
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Card({ title, action, children, className }) {
  return (
    <section className={"card" + (className ? ` ${className}` : "")}>
      {(title || action) && (
        <div className="card__head">
          {title && <h3>{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}
