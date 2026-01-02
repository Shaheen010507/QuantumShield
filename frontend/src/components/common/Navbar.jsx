
import { Link } from "react-router-dom";
import "../../styles/global.css";

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left */}
      <div className="nav-left">
        🛡️ <span>QuantumShield</span>
      </div>

      {/* Center */}
      <div className="nav-center">
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/register" className="btn-primary">Get Started</Link>
      </div>

      {/* Right */}
      <nav className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/#features">Features</Link>
        <Link to="/#contact">Contact</Link>
        <Link to="/#feedback">Feedback</Link>
      </nav>
    </header>
  );
}
