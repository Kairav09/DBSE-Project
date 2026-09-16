import { Routes, Route } from "react-router-dom";
import DashboardShell from "../../layouts/DashboardShell";
import DonorOverview from "./DonorOverview";
import DonorProfile from "./DonorProfile";
import DonorHistory from "./DonorHistory";
import DonorNearbyRequests from "./DonorNearbyRequests";
import DonorCamps from "./DonorCamps";

const navItems = [
  { to: "/donor", label: "Overview", end: true },
  { to: "/donor/history", label: "Donation history" },
  { to: "/donor/requests", label: "Nearby requests" },
  { to: "/donor/camps", label: "Donation camps" },
];

export default function DonorDashboard() {
  return (
    <DashboardShell role="donor" roleLabel="Donor dashboard" navItems={navItems}>
      <Routes>
        <Route index element={<DonorOverview />} />
        <Route path="profile" element={<DonorProfile />} />
        <Route path="history" element={<DonorHistory />} />
        <Route path="requests" element={<DonorNearbyRequests />} />
        <Route path="camps" element={<DonorCamps />} />
      </Routes>
    </DashboardShell>
  );
}
