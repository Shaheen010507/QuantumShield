/*import "../styles/register.css";
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
}*/


//new 

import "../styles/register.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const location = useLocation();

  // Get the role from RoleSelect page
  const role = location.state?.role || "User"; // default User if missing

  const register = async (e) => {
    e.preventDefault();

    // Collect form values
    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, phone, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Registration success
        nav("/login");       // Redirect to login
      } else {
        alert(data.error);   // Show backend error (like duplicate username)
      }
    } catch (err) {
      alert("Server error. Please try again later.");
      console.error(err);
    }
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
