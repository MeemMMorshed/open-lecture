import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchPage() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);

  const mockClassData = [
    {
      room: "CLH A",
      building: "Curtis Lecture Hall",
      schedule: [
        { day: "Monday", start: "15:00", duration: 2 },
        { day: "Wednesday", start: "17:00", duration: 2 },
      ],
    },
    {
      room: "LAS C",
      building: "Lassonde Building",
      schedule: [
        { day: "Tuesday", start: "14:00", duration: 1.5 },
        { day: "Thursday", start: "13:00", duration: 2 },
      ],
    },
  ];

  function isRoomFree(room, userDay, userTime) {
    const [userHour, userMinute] = userTime.split(":").map(Number);
    const userDecimalTime = userHour + userMinute / 60;

    for (const session of room.schedule) {
      if (session.day.toLowerCase() === userDay.toLowerCase()) {
        const [classHour, classMinute] = session.start.split(":").map(Number);
        const classStart = classHour + classMinute / 60;
        const classEnd = classStart + session.duration;

        if (userDecimalTime >= classStart && userDecimalTime < classEnd) {
          return false;
        }
      }
    }
    return true;
  }

  function getNextClass(room, userDay, userTime) {
    const [userHour, userMinute] = userTime.split(":").map(Number);
    const userDecimalTime = userHour + userMinute / 60;

    const sameDayClasses = room.schedule.filter(
      (session) => session.day.toLowerCase() === userDay.toLowerCase()
    );

    const nextClass = sameDayClasses.find((session) => {
      const [classHour, classMinute] = session.start.split(":").map(Number);
      const classStart = classHour + classMinute / 60;
      return classStart > userDecimalTime;
    });

    return nextClass
      ? `Free until ${nextClass.start}`
      : "Free";
  }

  const handleSearch = () => {
    if (!day || !time) {
      alert("Please select both day and time.");
      return;
    }

    const availableRooms = mockClassData.filter((room) =>
      isRoomFree(room, day, time)
    );
    setResults(availableRooms);
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
        <button className="cta-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <ul>
        {results.length > 0 ? (
          results.map((room, index) => (
            <li key={index}>
              {room.room} - {room.building} - {getNextClass(room, day, time)}
            </li>
          ))
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
