import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>QuantumShield</h1>
      <p>AI & Quantum ML–Based Zero Trust Fraud Detection Platform</p>

      <div className="buttons">
        <Link to="/role">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
