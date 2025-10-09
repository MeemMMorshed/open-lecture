import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchPage() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Mock search logic
    const mockResults = [
      { room: "CLH A", building: "Curtis Lecture Hall" },
      { room: "LAS C", building: "Lassonde Building" },
    ];

    if (day && time) {
      setResults(mockResults);
    } else {
      alert("Select both day and time");
    }
  };

  return (
    <div className="search-page">
      <h2>Search for Empty Rooms</h2>
      <div className="search-form">
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="cta-button" onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {results.map((r, i) => (
            <li key ={i}>
                {r.room} - {r.building}
            </li>
        ))}
      </ul>


      {/* 🔹 Updated link to go back to /home */}
      <Link to="/landingpage" className="cta-button">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
