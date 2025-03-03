import "./home.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
const Home: React.FC = () => {
  

  useEffect(() => {
    fetch("http://localhost:5000/api/events") // Change to your backend URL
      .then((response) => response.json())
      
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>Welcome to My Event Booking App</h2>
      
      <div className="menu-buttons">
        <Link to="/events">
          <button>View Events</button>
        </Link>
        <Link to="/book-event">
          <button>Book Event</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
