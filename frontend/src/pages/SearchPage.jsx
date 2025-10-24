import { useEffect, useState } from "react";
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
      setNotification(
        "❌ Error fetching available rooms. Please try again later."
      );
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
      {notification && (
        <div className="notification-banner">{notification}</div>
      )}
      <h2>Search for Empty Rooms</h2>

      <div className="search-form">
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
        
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day</option>
          <option value="M">Monday</option>
          <option value="T">Tuesday</option>
          <option value="W">Wednesday</option>
          <option value="R">Thursday</option>
          <option value="F">Friday</option>
        </select>

        <div className="time-range">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          ></input>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div className="button-group">
            <button className="cta-button" onClick={handleSearch}>
              Search
            </button>
            <button className="clear-button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      <ul>
        {results.length > 0 ? (
          results.map((room, index) => <li key={index}>{room}</li>)
        ) : (
          <p>No available rooms</p>
        )}
      </ul>

      {/* 🔹 Updated link to go back to /home */}
      <Link to="/landingpage" className="cta-button">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
