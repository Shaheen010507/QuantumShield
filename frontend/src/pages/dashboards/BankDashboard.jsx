import { useState } from "react";

export default function BankerDashboard() {
  const [page, setPage] = useState("global");

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h3>Banker Dashboard</h3>
        <button onClick={() => setPage("global")}>Global View</button>
        <button onClick={() => setPage("highrisk")}>High Risk</button>
        <button onClick={() => setPage("qsvm")}>QSVM Panel</button>
      </aside>

      <main style={content}>
        {page === "global" && <h2>Global Fraud Overview</h2>}
        {page === "highrisk" && <h2>High Risk Transactions</h2>}
        {page === "qsvm" && <h2>Quantum SVM Decision</h2>}
      </main>
    </div>
  );
}

const layout = { display: "flex", height: "100vh" };
const sidebar = { width: "250px", background: "#ccc", padding: "20px" };
const content = { padding: "30px" };
