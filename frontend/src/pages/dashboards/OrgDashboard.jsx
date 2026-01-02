import { useState } from "react";

export default function OrgDashboard() {
  const [page, setPage] = useState("overview");

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h3>Organization Dashboard</h3>
        <button onClick={() => setPage("overview")}>Overview</button>
        <button onClick={() => setPage("users")}>User Risks</button>
        <button onClick={() => setPage("reports")}>Reports</button>
      </aside>

      <main style={content}>
        {page === "overview" && <h2>Organization Overview</h2>}
        {page === "users" && <h2>User Risk Monitoring</h2>}
        {page === "reports" && <h2>Fraud Reports</h2>}
      </main>
    </div>
  );
}

const layout = { display: "flex", height: "100vh" };
const sidebar = { width: "250px", background: "#ddd", padding: "20px" };
const content = { padding: "30px" };
