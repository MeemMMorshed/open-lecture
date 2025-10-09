import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";

function LandingPage() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>OpenLecture</h1>
        <nav></nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>Find Empty Lecture Halls at Your University</h2>
        <p>More Universities Coming Soon...</p>
        <Link to="/search" className="cta-button">York University</Link>
        <Link to="" className="cta-button1">Coming Soon...</Link>
        <Link to="" className="cta-button2">Coming Soon...</Link>
        <Link to="" className="cta-button3">Coming Soon...</Link>
      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} OpenLecture. CEO Meem Morshed, Unpaid Intern Ricky Nguyen, Unpaid Consultant Noel Walton
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
