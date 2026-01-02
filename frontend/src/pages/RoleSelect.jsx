
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    navigate("/register", { state: { role } });
  };

  return (
    <div style={styles.container}>
      <h2>Select Your Role</h2>

      <button onClick={() => selectRole("user")}>User</button>
      <button onClick={() => selectRole("organization")}>Organization</button>
      <button onClick={() => selectRole("banker")}>Banker</button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  },
};
