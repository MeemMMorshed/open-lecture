import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import illustration from "../assets/students-in-class.png";
import brandIcon from "../assets/brand-icon.png";
import { API_BASE_URL } from "../config";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error || "Invalid email or password.");
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
        })
      );

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-copy">
          <h1>Welcome Back to OpenLecture! 👋</h1>

          <p>
            Your campus, unlocked — discover open lecture halls in real time.
          </p>

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
            <img src={brandIcon} alt="OpenLecture" />
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