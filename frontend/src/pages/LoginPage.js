import React, { useState } from "react";
import "./LoginPage.css"; 

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
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
      <div className="login-left">
        <h1>Welcome Back to OpenLecture! 👋</h1>
        <p>
         Your campus, unlocked — discover open lecture halls in real time.
        </p>
        <footer>© 2025 OpenLecture. All rights reserved.</footer>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>OpenLecture</h2>
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
          <a href="/forgot-password" className="forgot-link">Forgot password?</a>
        </form>
      </div>
    </div>
  );
}
