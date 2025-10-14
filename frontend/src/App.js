import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

// ✅ Navbar Component
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <nav className="navbar" style={{ padding: "1rem", background: "#f8f8f8" }}>
      <h2 style={{ display: "inline-block", marginRight: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          OpenLecture
        </Link>
      </h2>

      <div style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Welcome, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ✅ Landing Page
function LandingPage() {
  return (
    <div className="app">
      <header className="header">
        <h1>OpenLecture</h1>
      </header>

      <main className="hero">
        <h2>Find Empty Lecture Halls at Your University</h2>
        <p>More Universities Coming Soon...</p>
        <Link to="/search" className="cta-button">York University</Link>
        <Link to="" className="cta-button1">Coming Soon...</Link>
        <Link to="" className="cta-button2">Coming Soon...</Link>
        <Link to="" className="cta-button3">Coming Soon...</Link>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} OpenLecture. CEO Meem Morshed, Unpaid Intern Ricky Nguyen, Unpaid Consultant Noel Walton
      </footer>
    </div>
  );
}

// ✅ Search Page
function SearchPage() {
  return (
    <div className="search-page">
      <h2>Search for Empty Rooms</h2>
      <Link to="/landingpage" className="cta-button">⬅ Back to Home</Link>
    </div>
  );
}

// ✅ Main App
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* You can later add <Route path="/login" /> and <Route path="/signup" /> here */}
      </Routes>
    </>
  );
}

export default App;
