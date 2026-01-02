import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header className="header">
        <h1 className="logo">🛡 QuantumShield</h1>
        <nav>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <a href="#feedback">Feedback</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Securing Digital Trust with AI & Zero-Trust Security</h2>
        <p>Advanced fraud detection using Hybrid AI & Behavioral Intelligence.</p>

        <div className="hero-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/role-select" className="btn primary">Register</Link>
        </div>
      </section>

      <section id="features" className="features">
        <h3>Platform Features</h3>
        <ul>
          <li>✔ Zero Trust Security</li>
          <li>✔ AI Fraud Detection</li>
          <li>✔ Behavioral Analysis</li>
          <li>✔ Hybrid SVM + QSVM</li>
          <li>✔ Real-Time Alerts</li>
        </ul>
      </section>

      <footer id="contact">
        <p>Email: support@quantumshield.ai</p>
        <p>© 2026 QuantumShield</p>
      </footer>
    </>
  );
}
