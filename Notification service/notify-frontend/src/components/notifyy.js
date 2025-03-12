import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // ✅ Extract booking_id from URL
import "../App.css";

const NotificationList = () => {
  const { booking_id } = useParams();  // ✅ Get booking_id from URL
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5009/api/")  // ✅ Fetch all notifications
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  // ✅ Filter notifications to match the booking_id from the URL
  const filteredNotifications = notifications.filter(
    (notification) => String(notification.booking_id) === String(booking_id)
  );

  return (
    <div className="event-container">
      <div className="event-list">
        <h1>📬 Notification Service</h1>
        <ul>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <li key={notification._id} className="event-item">
                <div
                  onClick={() =>
                    setExpandedId(expandedId === notification._id ? null : notification._id)
                  }
                >
                  <strong>Booking ID:</strong> {notification.booking_id} |{" "}
                  <strong>Email:</strong> {notification.user_email}
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
            ))
          ) : (
            <p>No notifications found for Booking ID: {booking_id}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationList;