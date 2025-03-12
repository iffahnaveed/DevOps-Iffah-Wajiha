import "./home.css";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId"); // Get userId from URL

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>Welcome to My Event Booking App</h2>
      
      <div className="menu-buttons">
        <button onClick={() => window.location.href = "http://localhost:3000/"}>
          View Events
        </button>
        
        {/* Pass userId to the Book Event page */}
        <Link to={`/book-event?userId=${userId}`}>
          <button>Book Event</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;