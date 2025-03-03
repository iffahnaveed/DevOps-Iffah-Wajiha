const express = require("express");
const router = express.Router();
const pool = require("../config/database"); // PostgreSQL connection

// Create a new booking
router.post("/", async (req, res) => {
    try {
        const { eventId, userId, ticketCount } = req.body;

        const result = await pool.query(
            `INSERT INTO Bookings (eventId, userId, numberOfTickets, status, paymentStatus) 
             VALUES ($1, $2, $3, 'pending', 'unpaid') RETURNING id`,
            [eventId, userId, ticketCount]
        );

        res.status(201).json({ bookingId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
