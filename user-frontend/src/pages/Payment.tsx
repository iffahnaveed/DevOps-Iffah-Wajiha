import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Payment.css"; // Import the CSS for styling

const Payment: React.FC = () => {
  const { eventId, ticketCount } = useParams<{ eventId: string; ticketCount: string }>();
  const userId = 1; // Replace with actual user ID (e.g., from authentication)

  // State variables for form inputs
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!cardName || !cardNumber || !expiryDate || !cvv || !email) {
      alert("Please fill in all fields before proceeding.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create a Booking
      const bookingResponse = await axios.post("http://localhost:5002/api/bookings", {
        eventId,
        userId,
        ticketCount: Number(ticketCount),
      });

      const bookingId = bookingResponse.data.bookingId;

      // Step 2: Store Payment Details
      await axios.post("http://localhost:5002/api/payments", {
        bookingId,
        eventId,
        userId,
        ticketCount: Number(ticketCount),
        cardHolderName: cardName,
        cardNumber,
        expiryDate,
        cvv,
        email,
      });

      alert("Payment Successful! Your tickets are confirmed.");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <p><strong>Event ID:</strong> {eventId}</p>
      <p><strong>Number of Tickets:</strong> {ticketCount}</p>

      <form onSubmit={handlePayment} className="payment-form">
        <label>Cardholder Name:</label>
        <input 
          type="text" 
          placeholder="John Doe" 
          value={cardName} 
          onChange={(e) => setCardName(e.target.value)} 
          required 
        />

        <label>Card Number:</label>
        <input 
          type="text" 
          placeholder="1234 5678 9012 3456" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
          maxLength={16} 
          required 
        />

        <div className="card-details">
          <div>
            <label>Expiry Date:</label>
            <input 
              type="text" 
              placeholder="MM/YY" 
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>CVV:</label>
            <input 
              type="text" 
              placeholder="123" 
              value={cvv} 
              onChange={(e) => setCvv(e.target.value)} 
              maxLength={3} 
              required 
            />
          </div>
        </div>

        <label>Email:</label>
        <input 
          type="email" 
          placeholder="example@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <button type="submit" className="pay-btn" disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
