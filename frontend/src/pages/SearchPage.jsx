import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchPage() {
  const [day, setDay] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [notification, setNotification] = useState("");
  const [results, setResults] = useState([]);

  // const mockClassData = [
  //   {
  //     room: "CLH A",
  //     building: "Curtis Lecture Hall",
  //     schedule: [
  //       { day: "Monday", start: "15:00", duration: 2 },
  //       { day: "Wednesday", start: "17:00", duration: 2 },
  //     ],
  //   },
  //   {
  //     room: "LAS C",
  //     building: "Lassonde Building",
  //     schedule: [
  //       { day: "Tuesday", start: "14:00", duration: 1.5 },
  //       { day: "Thursday", start: "13:00", duration: 2 },
  //     ],
  //   },
  //   {
  //     room: "ACW 204",
  //     building: "Accolade West",
  //     schedule: [
  //       { day: "Monday", start: "09:00", duration: 1 },
  //       { day: "Wednesday", start: "15:00", duration: 2 },
  //       { day: "Friday", start: "10:00", duration: 1.5 },
  //     ],
  //   },
  //   {
  //     room: "CC 203",
  //     building: "Calumet College",
  //     schedule: [
  //       { day: "Tuesday", start: "08:30", duration: 1.5 },
  //       { day: "Thursday", start: "11:00", duration: 1.5 },
  //       { day: "Friday", start: "14:00", duration: 2 },
  //     ],
  //   },
  //   {
  //     room: "VLH D",
  //     building: "Vari Hall",
  //     schedule: [
  //       { day: "Monday", start: "11:00", duration: 2 },
  //       { day: "Wednesday", start: "09:00", duration: 1 },
  //       { day: "Thursday", start: "15:00", duration: 1.5 },
  //     ],
  //   },
  // ];



  function isRoomFree(room, userDay, userStart, userEnd) {
    const [userStartHour, userStartMinute] = userStart.split(":").map(Number);
    const [userEndHour, userEndMinute] = userEnd.split(":").map(Number);

    const userStartDecimal = userStartHour + userStartMinute / 60;
    const userEndDecimal = userEndHour + userEndMinute / 60;

    for (const session of room.schedule) {
      if (session.day.toLowerCase() === userDay.toLowerCase()) {
        const [classHour, classMinute] = session.start.split(":").map(Number);
        const classStart = classHour + classMinute / 60;
        const classEnd = classStart + session.duration;

        if (userStartDecimal < classEnd && userEndDecimal > classStart) {
          return false;
        }
      }
    }
    return true;
  }

  // function getNextClass(room, userDay, userTime) {
  //   const [userHour, userMinute] = userTime.split(":").map(Number);
  //   const userDecimalTime = userHour + userMinute / 60;

  //   const sameDayClasses = room.schedule.filter(
  //     (session) => session.day.toLowerCase() === userDay.toLowerCase()
  //   );

  //   const nextClass = sameDayClasses.find((session) => {
  //     const [classHour, classMinute] = session.start.split(":").map(Number);
  //     const classStart = classHour + classMinute / 60;
  //     return classStart > userDecimalTime;
  //   });

  //   return nextClass ? `Free until ${nextClass.start}` : "Free";
  // }

  const handleSearch = async() => {
    if (!day || !startTime || !endTime) {
      setNotification("Please select both day and time range.");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/courses/available?day=${day}&startTime=${startTime}&endTime=${endTime}`);
      
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
      {notification && <div className="notification-banner">{notification}</div>}
      <h2>Search for Empty Rooms</h2>

      <div className="search-form">
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
          results.map((room, index) => (
            <li key={index}>
              {room}
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
