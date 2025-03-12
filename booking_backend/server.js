const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/database"); // Make sure this file exports a valid Sequelize instance
const db = require("./models"); // Ensure models are correctly imported

const bookingRoutes = require("./routes/bookingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Booking Service is Running 🚀");
});

// ✅ Secure JWT-protected route
app.get("/dashboard", (req, res) => {
  const token = req.cookies?.token; // Use optional chaining to avoid undefined errors

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Welcome to the dashboard!", userId: decoded.userId });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ Register API routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use(cors({ credentials: true, origin: "*" })); // ✅ Allow frontend requests
const PORT = process.env.PORT || 5002;

// ✅ Start server and sync database
(async () => {
  try {
    await sequelize.sync(); // Sync database before starting the server
    console.log("✅ Database synchronized");

    app.listen(PORT, () => 
      console.log(`🚀 Booking Service running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
    process.exit(1);
  }
})();