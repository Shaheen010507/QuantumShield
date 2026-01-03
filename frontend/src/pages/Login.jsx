
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store logged-in user info in localStorage
        localStorage.setItem("loggedUser", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "User") nav("/user");
        if (data.user.role === "Banker") nav("/banker");
        if (data.user.role === "Organization") nav("/org");
      } else {
        alert(data.error); // Show backend error
      }
    } catch (err) {
      alert("Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <form className="login" onSubmit={login}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Login</button>
    </form>
  );
}
