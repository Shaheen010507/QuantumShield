import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../components/auth/Login";
import RoleSelect from "../components/auth/RoleSelect";
import UserDashboard from "../pages/dashboards/UserDashboard";
import OrgDashboard from "../pages/dashboards/OrgDashboard";
import BankDashboard from "../pages/dashboards/BankDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/org" element={<OrgDashboard />} />
        <Route path="/bank" element={<BankDashboard />} />
      </Route>
    </Routes>
  );
}
