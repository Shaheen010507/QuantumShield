import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RoleSelect from "./pages/RoleSelect";
import Register from "./pages/Register";
import UserDashboard from "./pages/dashboards/UserDashboard";
import BankerDashboard from "./pages/dashboards/BankerDashboard";
import OrgDashboard from "./pages/dashboards/OrgDashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/banker" element={<BankerDashboard />} />
        <Route path="/org" element={<OrgDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
