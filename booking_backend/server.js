const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const bookingRoutes = require("./routes/bookingRoutes");
const eventRoutes = require("./routes/eventRoutes"); // Import event routes
const paymentRoutes = require("./routes/paymentRoutes"); // Import payment routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Booking Service is Running 🚀");
});

// Register API routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes); 
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5002;

// Properly handle database sync errors
(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Database synchronized");

    app.listen(PORT, () => 
      console.log(`🚀 Booking Service running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
    process.exit(1); // Exit the process if database connection fails
  }
})();
