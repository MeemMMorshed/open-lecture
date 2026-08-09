import React, { useLayoutEffect } from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import brandIcon from "./assets/brand-icon.png";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      <img
        src={brandIcon}
        alt="OpenLecture logo"
        className="brand__icon"
      />

        <Link to="/home" className="brand__text">
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
        ) : null}
      </div>
    </header>
  );
}

function LandingPage() {
  const stop = (e) => e.preventDefault();

  return (
    <main className="landing">
      <section className="heroCard">
        <p className="heroEyebrow">Campus study made simple</p>
        <h1 className="heroTitle">Find empty lecture halls and calm study spaces in seconds</h1>
        <p className="heroSubtitle">
          Search by day, time, and building to discover the perfect spot for focus, revision, and collaboration.
        </p>

        <div className="heroStats">
          <div className="heroStat">
            <strong>30+</strong>
            <span>Campus buildings</span>
          </div>
          <div className="heroStat">
            <strong>Real-time</strong>
            <span>availability checks</span>
          </div>
          <div className="heroStat">
            <strong>Any time</strong>
            <span>study-friendly spaces</span>
          </div>
        </div>

        <div className="uniGrid">
          <Link to="/search" className="uniBtn uniBtn--primary">
            York University
          </Link>

          <button type="button" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon
          </button>

          <button type="button" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon
          </button>

          <button type="button" onClick={stop} className="uniBtn uniBtn--disabled">
            Coming Soon
          </button>
        </div>

        <div className="featureGrid">
          <article className="featureCard">
            <h3>Fast filters</h3>
            <p>Choose a day, time window, and building quickly.</p>
          </article>
          <article className="featureCard">
            <h3>Study-friendly</h3>
            <p>Discover quieter spaces for revision, coding, and group work.</p>
          </article>
          <article className="featureCard">
            <h3>Campus-ready</h3>
            <p>Built to make finding an open room feel effortless.</p>
          </article>
        </div>

        <p className="heroNote">More universities will be added soon.</p>
      </section>
    </main>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
