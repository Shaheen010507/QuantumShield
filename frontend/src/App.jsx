import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "/dashboards/UserDashboard";
import OrgDashboard from "/dashboards/OrgDashboard";
import BankerDashboard from "./dashboards/BankerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user" element={<UserDashboard />} />
        <Route path="/org" element={<OrgDashboard />} />
        <Route path="/banker" element={<BankerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
