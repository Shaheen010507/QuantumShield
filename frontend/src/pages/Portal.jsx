import { useNavigate } from "react-router-dom";

export default function Portal() {
  const navigate = useNavigate();

  return (
    <div className="portal-container">
      <h2>Select Your Portal</h2>

      <div className="portal-grid">
        <div onClick={() => navigate("/login/user")} className="portal-card">
          User Portal
        </div>

        <div onClick={() => navigate("/login/org")} className="portal-card">
          Organization Portal
        </div>

        <div onClick={() => navigate("/login/bank")} className="portal-card">
          Bank Security Portal
        </div>
      </div>
    </div>
  );
}
