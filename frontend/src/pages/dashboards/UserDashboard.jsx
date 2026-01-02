import { useState } from "react";

export default function UserDashboard() {
  const [page, setPage] = useState("profile");

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h3>User Dashboard</h3>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("transaction")}>Transaction</button>
        <button onClick={() => setPage("result")}>Fraud Result</button>
      </aside>

      <main style={content}>
        {page === "profile" && <h2>User Profile</h2>}
        {page === "transaction" && <h2>Enter Transaction Details</h2>}
        {page === "result" && <h2>Fraud Risk: HIGH (QSVM)</h2>}
      </main>
    </div>
  );
}

const layout = { display: "flex", height: "100vh" };
const sidebar = { width: "250px", background: "#eee", padding: "20px" };
const content = { padding: "30px" };
