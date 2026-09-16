import { NavLink, useNavigate } from "react-router-dom";
import "./DashboardShell.css";



const ROLE_LABELS = {
  donor: "Donor Portal",
  hospital: "Hospital Portal",
  admin: "Admin Portal",
};

const ROLE_USERS = {
  donor: { name: "Ananya Rao", sub: "O+ · Hyderabad" },
  hospital: { name: "Yashoda Hospital", sub: "Somajiguda" },
  admin: { name: "City Central", sub: "Blood Bank" },
};

export default function DashboardShell({ role, roleLabel, navItems, children }) {
  const navigate = useNavigate();
  const fallbackUser = ROLE_USERS[role] || ROLE_USERS.donor;
  const userName = localStorage.getItem("userName") || fallbackUser.name;
  const userSub = localStorage.getItem("userSub") || fallbackUser.sub;

  return (
    <div className="shell" data-role={role}>
      <aside className="shell__sidebar">
        <div className="shell__brand">
          <span className="shell__brand-mark">+</span>
          <div>
            <div className="shell__brand-name">RaktaSetu</div>
            <div className="shell__brand-role">{ROLE_LABELS[role] || roleLabel}</div>
          </div>
        </div>

        <nav className="shell__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "shell__nav-link" + (isActive ? " is-active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div
          className="shell__user"
          style={role === "donor" ? { cursor: "pointer" } : {}}
          onClick={() => role === "donor" && navigate("/donor/profile")}
        >
          <div className="shell__user-avatar">{userName[0]}</div>
          <div>
            <div className="shell__user-name">{userName}</div>
            <div className="shell__user-sub">{userSub}</div>
          </div>
        </div>

        <button className="shell__exit" onClick={() => navigate("/home")}>
          ← Switch role
        </button>
      </aside>

      <main className="shell__main">{children}</main>
    </div>
  );
}
