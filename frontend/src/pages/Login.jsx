import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      u =>
        u.username === e.target.username.value &&
        u.password === e.target.password.value
    );

    if (!user) return alert("Invalid credentials");

    user.lastLogin = new Date().toLocaleString();
    localStorage.setItem("loggedUser", JSON.stringify(user));

    if (user.role === "User") nav("/user");
    if (user.role === "Banker") nav("/banker");
    if (user.role === "Organization") nav("/org");
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
