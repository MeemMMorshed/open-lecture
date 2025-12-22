import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: replace with your real endpoint + payload keys
    // const res = await fetch("http://localhost:8080/api/auth/signup", { ... })

    // For now:
    navigate("/login");
  };

  return (
    <main className="authPage">
      

      <section className="authCenter">
        <h1 className="authTitle">Create your account</h1>
        <p className="authSubtitle">
          Join OpenLecture to find study spaces at your university
        </p>

        <form className="authCard" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="john.doe@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="primaryBtn" type="submit">
            Create Account
          </button>

          
          
        </form>
      </section>
    </main>
  );
}
