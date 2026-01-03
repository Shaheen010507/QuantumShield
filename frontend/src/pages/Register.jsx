import "../styles/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");

  const register = (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role,
      lastLogin: null
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    nav("/login");
  };

  return (
    <form className="register" onSubmit={register}>
      <h2>Register as {role}</h2>
      <input name="name" placeholder="Full Name" required />
      <input name="username" placeholder="Username" required />
      <input name="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Register</button>
    </form>
  );
}
