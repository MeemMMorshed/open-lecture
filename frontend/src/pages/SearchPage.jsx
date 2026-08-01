import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchPage() {
  const [day, setDay] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [building, setBuilding] = useState("");
  const [notification, setNotification] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!day || !startTime || !endTime) {
      setNotification("Please select both day and time range.");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/courses/available?day=${day}&startTime=${startTime}&endTime=${endTime}&building=${building}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data);

      if (data.length > 0) {
        setNotification(`✅ Found ${data.length} available room(s).`);
      } else {
        setNotification("❌ No available rooms for that time range.");
      }
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setNotification("❌ Error fetching available rooms. Please try again later.");
    }

    setTimeout(() => setNotification(""), 3000);
  };

  const handleClear = () => {
    setDay("");
    setStartTime("");
    setEndTime("");
    setResults([]);
  };

  return (
    <div className="search-page">
      <div className="search-shell">
        <div className="page-heading">
          <div>
            <h2>Find a room that fits your study plan</h2>
            <p>Pick a building, day, and time window to view available lecture halls.</p>
          </div>
          <Link to="/home" className="btn btn--ghost">
            ← Back home
          </Link>
        </div>

        {notification && (
          <div className="notification-banner">{notification}</div>
        )}

        <div className="search-card">
          <div className="search-form">
            <label className="field-card">
              <span className="field-label">Building</span>
              <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                <option value="">All Buildings</option>
                <option value="ACW">Accolade West</option>
                <option value="ACE">Accolade East</option>
                <option value="ATK">Atkinson</option>
                <option value="BRG">Bergeron Centre</option>
                <option value="CB">Chemistry Building</option>
                <option value="CC">Calumet College</option>
                <option value="CFA">The Joan & Martin Goldfarb Centre</option>
                <option value="CFT">Centre for Film and Theatre</option>
                <option value="CLH">Curtis Lecture Hall</option>
                <option value="CSQ">Central Square</option>
                <option value="DB">Dahdaleh Building</option>
                <option value="FC">Founders College</option>
                <option value="FRQ">Farquharson Life Sciences</option>
                <option value="HNE">Health, Nursing and Environmental Studies Building</option>
                <option value="LAS">Lassonde Building</option>
                <option value="LSB">Life Science Building</option>
                <option value="LUM">Lumbers Building</option>
                <option value="MB">McLaughlin College</option>
                <option value="PSE">Petrie Science and Engineering Building</option>
                <option value="R">Ross Building</option>
                <option value="SC">Stong College</option>
                <option value="SHR">Sherman Health Science Research Centre</option>
                <option value="SLH">Stedman Lecture Halls</option>
                <option value="TFC">Track and Field Centre</option>
                <option value="TM">Tait Mckenzie Centre</option>
                <option value="VC">Vanier College</option>
                <option value="VH">Vari Hall</option>
                <option value="WSC">William Small Centre</option>
              </select>
            </label>

            <label className="field-card">
              <span className="field-label">Day</span>
              <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Select Day</option>
                <option value="M">Monday</option>
                <option value="T">Tuesday</option>
                <option value="W">Wednesday</option>
                <option value="R">Thursday</option>
                <option value="F">Friday</option>
              </select>
            </label>

            <div className="time-range">
              <label className="field-card">
                <span className="field-label">Start</span>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </label>
              <label className="field-card">
                <span className="field-label">End</span>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </label>
            </div>

            <div className="button-group">
              <button className="btn btn--dark" onClick={handleSearch}>
                Search
              </button>
              <button className="btn btn--ghost" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="results-card">
          <div className="results-header">
            <h3>Available rooms</h3>
            <span className="results-count">{results.length} found</span>
          </div>

          <ul className="results-list">
            {results.length > 0 ? (
              results.map((room, index) => <li key={index} className="result-item">{room}</li>)
            ) : (
              <li className="empty-state">No rooms match that search yet. Try a different time or building.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
