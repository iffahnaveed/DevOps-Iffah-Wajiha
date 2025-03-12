import React, { useEffect, useState } from "react";
import "../App.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5004/api/events") // Update with your API URL
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="event-container">
      {/* Left side: Event List */}
      <div className="event-list">
        <h1>Welcome to Event Service</h1>
        <h2>Event List</h2>
        <ul>
          {events.map((event) => (
            <li key={event._id} onClick={() => setSelectedEvent(event)} className="event-item">
              <strong>{event.event_name}</strong> - {event.date} at {event.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Event Details */}
      {selectedEvent && (
        <div className="event-details">
          <h3>{selectedEvent.event_name}</h3>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EventList;
