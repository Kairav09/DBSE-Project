import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/donor/DonorDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/donor/*" element={<DonorDashboard />} />
      <Route path="/hospital/*" element={<HospitalDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}
