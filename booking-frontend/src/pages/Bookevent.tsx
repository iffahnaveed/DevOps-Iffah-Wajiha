import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./Bookevent.css";

interface Event {
  id: string;
  name: string;
}

const EventSelection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(""); 
  const [ticketCount, setTicketCount] = useState<number>(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") ?? ""; // Ensure userId is not null

  useEffect(() => {
    fetch("http://localhost:5004/api/events")
      .then((response) => response.json())
      .then((data) => {
        console.log("🔹 Fetched events data:", data);

        const formattedEvents = data.map((event: any) => ({
          id: event._id ?? "", // Ensure ID is not undefined
          name: event.event_name ?? "Unknown Event",
        }));

        setEvents(formattedEvents);
        console.log("✅ Events set in state:", formattedEvents);
      })
      .catch((error) => console.error("❌ Error fetching events:", error));
  }, []);
  const handleProceed = async () => {
    console.log("✔️ Proceed button clicked");
  
    if (!selectedEventId) {
      alert("Please select an event to proceed.");
      console.error("❌ No event selected!");
      return;
    }
  
    if (!userId) {
      alert("User not authenticated. Please log in.");
      console.error("❌ User ID missing from URL!");
      return;
    }
  
    console.log("🔹 Booking request data:", {
      eventId: selectedEventId,
      userId: Number(userId),
      numberOfTickets: ticketCount,
    });
  
    try {
      const response = await fetch("http://localhost:5002/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEventId,
          userId: Number(userId),
          numberOfTickets: ticketCount,
        }),
      });
  
      const data = await response.json();
      console.log("🔹 Booking response:", data);
  
      if (response.ok && data.bookingId) {
        alert("Booking created successfully. Proceeding to payment.");
        // Navigate to Payment with all required parameters
        navigate(`/payment/${data.bookingId}/${selectedEventId}/${userId}/${ticketCount}`);
      } else {
        alert("❌ Failed to create booking: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  };  
  return (
    <div className="event-selection-container">
      <h2>Select an Event to Book</h2>

      <div className="selection-box">
        <label>Choose an Event:</label>
        <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
          <option value="" disabled>Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
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

      <button className="proceed-btn" type="button" onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default EventSelection;