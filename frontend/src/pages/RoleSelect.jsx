/*import "../styles/role.css";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <div className="role-box">
        <h2>Select Your Role</h2>

        <button className="role-btn" onClick={() => navigate("/register/user")}>
          User
        </button>

        <button className="role-btn" onClick={() => navigate("/register/banker")}>
          Banker
        </button>

        <button className="role-btn" onClick={() => navigate("/register/org")}>
          Organization
        </button>
      </div>
    </div>
  );
}
*/


// new 


import "../styles/role.css";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <div className="role-box">
        <h2>Select Your Role</h2>

        <button
          className="role-btn"
          onClick={() => navigate("/register", { state: { role: "User" } })}
        >
          User
        </button>

        <button
          className="role-btn"
          onClick={() => navigate("/register", { state: { role: "Banker" } })}
        >
          Banker
        </button>

        <button
          className="role-btn"
          onClick={() =>
            navigate("/register", { state: { role: "Organization" } })
          }
        >
          Organization
        </button>
      </div>
    </div>
  );
}
