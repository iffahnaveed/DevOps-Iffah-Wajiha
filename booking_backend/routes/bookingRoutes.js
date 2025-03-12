const express = require("express");
const router = express.Router();
const { Booking } = require("../models"); // ✅ Ensure correct import

// 📌 GET all bookings
/*
router.get("/", async (req, res) => {
  console.log("📌 GET /api/bookings called"); // ✅ Debugging log

  try {
    const bookings = await Booking.findAll();
    console.log("📌 Retrieved bookings:", bookings.map(b => b.dataValues)); // ✅ Clean log output
    res.json(bookings);
  } catch (error) {
    console.error("❌ Error in GET /api/bookings:", error.message);
    res.status(500).json({ error: "Error fetching bookings", details: error.message });
  }
});*/
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract booking ID from URL
        const { status, paymentStatus } = req.body;

        const booking = await Booking.findByPk(id); // Check if booking exists
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = status;
        booking.paymentStatus = paymentStatus;
        await booking.save(); // Update the database

        res.json({ success: true, message: "Booking updated successfully", booking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// 📌 POST: Create a new booking
router.post("/", async (req, res) => {
  console.log("📌 POST /api/bookings - Request received:", req.body); // ✅ Debugging log

  try {
    const { eventId, userId, numberOfTickets } = req.body;

    // 🔴 Validate required fields
    if (!eventId || !userId || !numberOfTickets) {
      console.error("❌ Missing required fields:", { eventId, userId, numberOfTickets });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Create new booking
    const newBooking = await Booking.create({
      eventId,
      userId,
      numberOfTickets,
      status: "pending",
      paymentStatus: "unpaid",
    });

    console.log("✅ Booking created successfully:", newBooking.dataValues); // 🔹 Debugging log

    res.status(201).json({ bookingId: newBooking.id });
  } catch (error) {
    console.error("❌ Error in POST /api/bookings:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
