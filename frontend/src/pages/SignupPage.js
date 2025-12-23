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

    // TODO: replace endpoint + payload to match your backend
    // Example:
    // const res = await fetch("http://localhost:8080/api/auth/signup", { ... });

    // For now just navigate:
    navigate("/login");
  };

  return (
    <div className="signupPage">
      {/* LEFT */}
      <section className="signupLeft">
        <div className="signupLeftInner">
          <h1 className="signupHeadline">
            Find your perfect <br /> study space
          </h1>

          <p className="signupDesc">
          OpenLecture helps you find empty lecture halls across campus that are perfect for studying, 
          group work, or hanging out with friends in a quiet, private space.

          </p>

          <ul className="signupFeatures">
            <li className="featureItem">
              <span className="featureDot" />
              <div>
                <div className="featureTitle">Real-time availability</div>
                <div className="featureText">
                  See which study spaces are open right now
                </div>
              </div>
            </li>

            <li className="featureItem">
              <span className="featureDot" />
              <div>
                <div className="featureTitle">Campus-wide coverage</div>
                <div className="featureText">
                  Access info for all study spaces across your university
                </div>
              </div>
            </li>

            <li className="featureItem">
              <span className="featureDot" />
              <div>
                <div className="featureTitle">Private, quiet spaces</div>
                <div className="featureText">
                 Find empty lecture halls when you need a distraction-free place on campus.
                </div>
              </div>
            </li>

          </ul>
        </div>
      </section>

      {/* RIGHT */}
      <section className="signupRight">
        <div className="signupCard">
          <h2 className="signupTitle">Create your account</h2>
          <p className="signupSubtitle">Start finding study spaces in minutes</p>

          <form className="signupForm" onSubmit={handleSubmit}>
            <label className="fieldLabel">Full Name</label>
            <input
              className="fieldInput"
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <label className="fieldLabel">Email</label>
            <input
              className="fieldInput"
              type="email"
              name="email"
              placeholder="john.doe@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label className="fieldLabel">Password</label>
            <input
              className="fieldInput"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label className="fieldLabel">Confirm Password</label>
            <input
              className="fieldInput"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button className="primaryBtn" type="submit">
              Create Account
            </button>

            <div className="dividerRow">
              <div className="dividerLine" />
              <div className="dividerText">ALREADY HAVE AN ACCOUNT?</div>
              <div className="dividerLine" />
            </div>

            <Link className="secondaryBtn" to="/login">
              Sign in instead
            </Link>

            
          </form>
        </div>
      </section>
    </div>
  );
}
