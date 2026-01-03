import "../../styles/org-dashboard.css";

export default function OrgDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="org-dashboard">
      <h1>Organization Dashboard</h1>
      <p className="welcome">Admin: {user.name}</p>

      {/* METRICS */}
      <section className="metrics">
        <div>Total Transactions: <b>1,420</b></div>
        <div>High Risk: <b className="danger">18</b></div>
        <div>Compliance Status: <b className="safe">Compliant</b></div>
      </section>

      {/* TRANSACTIONS */}
      <section className="card">
        <h3>Department Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Txn ID</th>
              <th>Amount</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Finance</td>
              <td>TXN5001</td>
              <td>₹1,20,000</td>
              <td className="danger">High</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* RISK TRAJECTORY */}
      <section className="card">
        <h3>Predictive Risk Trajectory</h3>
        <p>
          AI models indicate a rising fraud trend in Finance department.
          Preventive controls recommended.
        </p>
      </section>

      {/* AUDIT */}
      <section className="card">
        <h3>Audit & Compliance Logs</h3>
        <p>
          All activities logged under Zero Trust security model.
          Blockchain audit integration planned.
        </p>
      </section>
    </div>
  );
}
