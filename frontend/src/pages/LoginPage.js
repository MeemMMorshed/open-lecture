import React, { useState } from "react";
import "./LoginPage.css";
import illustration from "../assets/students-in-class.png";
import brandIcon from "../assets/brand-icon.png";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        

        <div className="login-copy">
          <h1>Welcome Back to OpenLecture! 👋</h1>
          <p>Your campus, unlocked — discover open lecture halls in real time.</p>

          {/* Illustration */}
          <div className="login-illustration">
            <img src={illustration} alt="Students in lecture hall" />
          </div>
        </div>

        <footer>© 2025 OpenLecture. All rights reserved.</footer>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-brand">
  <img src={brandIcon} alt="OpenLecture logo" />
  <span>OpenLecture</span>
</div>


          <p>Welcome Back!</p>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <a href="/forgot-password" className="forgot-link">
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}
