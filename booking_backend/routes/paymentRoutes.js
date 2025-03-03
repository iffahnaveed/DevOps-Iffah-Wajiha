const express = require("express");
const router = express.Router();
const pool = require("../config/database"); // PostgreSQL connection

// Store payment details
router.post("/", async (req, res) => {
    try {
        const { bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email } = req.body;

        await pool.query(
            `INSERT INTO Payments (bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email, paymentStatus) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'paid')`,
            [bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email]
        );

        // Update Booking Payment Status
        await pool.query(`UPDATE Bookings SET paymentStatus = 'paid', status = 'confirmed' WHERE id = $1`, [bookingId]);

        res.status(201).json({ message: "Payment Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
