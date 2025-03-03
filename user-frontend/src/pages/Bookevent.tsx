import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookevent.css"; 

interface Event {
  id: string;
  name: string;
}

const EventSelection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [ticketCount, setTicketCount] = useState<number>(1);
  const navigate = useNavigate();

  // Fetch events from the backend
  useEffect(() => {
    fetch("http://localhost:5002/api/events")  // Backend API URL
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleProceed = () => {
    if (!selectedEvent) {
      alert("Please select an event to proceed.");
      return;
    }
    navigate(`/payment/${selectedEvent}/${ticketCount}`);
  };

  return (
    <div className="event-selection-container">
      <h2>Select an Event to Book</h2>
      <div className="selection-box">
        <label>Choose an Event:</label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          <option value="" disabled>Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>

      <div className="selection-box">
        <label>Number of Tickets:</label>
        <select value={ticketCount} onChange={(e) => setTicketCount(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <button className="proceed-btn" onClick={handleProceed} disabled={!selectedEvent}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default EventSelection;