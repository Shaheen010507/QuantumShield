import "../../styles/banker-dashboard.css";

export default function BankerDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="banker-dashboard">
      <h1>Banker Dashboard</h1>
      <p className="welcome">Officer: {user.name}</p>

      {/* OVERVIEW */}
      <section className="stats">
        <div>Active Users: <b>124</b></div>
        <div>High-Risk Alerts: <b className="danger">7</b></div>
        <div>Pending Reviews: <b>3</b></div>
      </section>

      {/* FLAGGED TRANSACTIONS */}
      <section className="card">
        <h3>Flagged Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Txn ID</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user_101</td>
              <td>TXN102</td>
              <td>₹90,000</td>
              <td className="danger">High</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* EXPLAINABILITY */}
      <section className="card">
        <h3>Fraud Decision Explanation</h3>
        <p>
          QSVM classified this transaction as high risk due to:
        </p>
        <ul>
          <li>Unusual transaction amount</li>
          <li>Device change</li>
          <li>Location anomaly</li>
        </ul>
      </section>

      {/* ACTION */}
      <section className="card action">
        <button className="approve">Approve</button>
        <button className="block">Block</button>
      </section>
    </div>
  );
}
