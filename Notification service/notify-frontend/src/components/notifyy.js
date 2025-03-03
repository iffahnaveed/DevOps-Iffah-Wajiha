import React, { useEffect, useState } from "react";
import "../App.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track clicked notification

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications") // ✅ Fetch notifications
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="event-container">
      <div className="event-list">
        <h1>📬 Notification Service</h1>
        <ul>
          {notifications.map((notification) => (
            <li 
              key={notification._id} 
              className="event-item"
            >
              <div onClick={() => setExpandedId(expandedId === notification._id ? null : notification._id)}>
                <strong>Booking ID:</strong> {notification.booking_id} | <strong>Email:</strong> {notification.user_email}
              </div>

              {expandedId === notification._id && (
                <div className="event-details">
                  <p><strong>Event Name:</strong> {notification.event_name}</p>
                  <p><strong>Status:</strong> {notification.status}</p>
                  <p><strong>Notification Sent:</strong> {notification.notification_sent ? "Yes" : "No"}</p>
                  <button onClick={() => setExpandedId(null)}>Close</button> {/* Close button */}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationList;
