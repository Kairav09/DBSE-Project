import { Routes, Route } from "react-router-dom";
import DashboardShell from "../../layouts/DashboardShell";
import AdminOverview from "./AdminOverview";
import AdminInventory from "./AdminInventory";
import AdminRequests from "./AdminRequests";
import AdminAlerts from "./AdminAlerts";
import AdminMatching from "./AdminMatching";
import AdminForecast from "./AdminForecast";
import AdminCrossMatch from "./AdminCrossMatch";
import AdminCamps from "./AdminCamps";
import AdminReports from "./AdminReports";

const navItems = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/inventory", label: "Inventory" },
  { to: "/admin/requests", label: "Requests" },
  { to: "/admin/alerts", label: "Emergency alerts" },
  { to: "/admin/matching", label: "Donor matching" },
  { to: "/admin/crossmatch", label: "Cross-match records" },
  { to: "/admin/camps", label: "Camp management" },
  { to: "/admin/forecast", label: "AI demand prediction" },
  { to: "/admin/reports", label: "Reports & analytics" },
];

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin" roleLabel="Admin dashboard" navItems={navItems}>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="alerts" element={<AdminAlerts />} />
        <Route path="matching" element={<AdminMatching />} />
        <Route path="crossmatch" element={<AdminCrossMatch />} />
        <Route path="camps" element={<AdminCamps />} />
        <Route path="forecast" element={<AdminForecast />} />
        <Route path="reports" element={<AdminReports />} />
      </Routes>
    </DashboardShell>
  );
}
