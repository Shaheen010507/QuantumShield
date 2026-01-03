import "../../styles/user-dashboard.css";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <p className="welcome">Welcome, {user.name}</p>

      {/* USER INFO */}
      <section className="card">
        <h3>Account Information</h3>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Last Login:</b> {user.lastLogin}</p>
        <p><b>Account Status:</b> Active</p>
      </section>

      {/* RISK STATUS */}
      <section className="card">
        <h3>Fraud Risk Status</h3>
        <p><b>Current Risk Score:</b> Low</p>
        <p>
          Decision: <span className="safe">Legitimate</span>
        </p>
        <p className="note">
          (Hybrid SVM + QSVM explanation will appear here)
        </p>
      </section>

      {/* TRANSACTIONS */}
      <section className="card">
        <h3>Your Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TXN101</td>
              <td>₹12,000</td>
              <td>Completed</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>TXN102</td>
              <td>₹90,000</td>
              <td>Flagged</td>
              <td className="danger">High</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ALERTS */}
      <section className="card alert-box">
        <h3>Fraud Alerts</h3>
        <p>
          Suspicious activity detected in TXN102.
          Please wait while banker review is in progress.
        </p>
      </section>
    </div>
  );
}
