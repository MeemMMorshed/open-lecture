import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <span className="brand__icon">🎓</span>
        <Link to="/landingpage" className="brand__text">
          OpenLecture
        </Link>
      </div>

      <div className="topbar__right">
        {user ? (
          <>
            <span className="topbar__welcome">Welcome, {user.username}</span>
            <button className="btn btn--ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="topbar__link" to="/login">
              Login
            </Link>
            <Link className="btn btn--dark" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

function LandingPage() {
  const stop = (e) => e.preventDefault();

  return (
    <main className="landing">
      <section className="heroCard">
        <h1 className="heroTitle">Find Empty Lecture Halls at Your University</h1>
        <p className="heroSubtitle">
          Discover quiet study spaces across campus in real-time
        </p>

        <div className="uniGrid">
          <Link to="/search" className="uniBtn uniBtn--primary">
            York University
          </Link>

          <a href="#" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon...
          </a>

          <a href="#" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon...
          </a>

          <a href="#" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon...
          </a>
        </div>

        <p className="heroNote">More Universities Coming Soon...</p>
      </section>
      
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
