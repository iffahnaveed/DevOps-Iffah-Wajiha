import React, { useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const Payment: React.FC = () => {
  

  // Extracting IDs from URL
  const { bookingId, eventId, userId, ticketCount } = useParams<{
    bookingId: string;
    eventId: string;
    userId: string;
    ticketCount: string;
  }>();

  // Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Corrected Payment Handler
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent form submission
    setLoading(true);

    try {
      // ✅ Send actual form data (not hardcoded values)
      const paymentResponse = await axios.post("http://localhost:5002/api/payments", {
        bookingId,
        eventId,
        userId,
        ticketCount,
        cardHolderName: cardName,
        cardNumber,
        expiryDate,
        cvv,
        email,
      });

      console.log("✅ Payment successful:", paymentResponse.data);

      if (paymentResponse.data?.success) {
        // ✅ Update Booking Status after Payment
        await axios.put(`http://localhost:5002/api/bookings/${bookingId}`, {
          status: "confirmed",
          paymentStatus: "paid",
        });

        alert("Payment Successful! Your tickets are confirmed.");
        window.location.href = `http://localhost:3001/${bookingId}`;
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error processing payment:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <p><strong>Event ID:</strong> {eventId}</p>
      <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Number of Tickets:</strong> {ticketCount}</p>

      {/* ✅ Corrected onSubmit to properly call handlePayment */}
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
          pattern="\d{16}"
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
              pattern="(0[1-9]|1[0-2])\/\d{2}"
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
              pattern="\d{3}"
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