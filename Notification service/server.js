const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database"); // Import database connection
const eventRoutes = require("./routes/notifyroutes");
require("dotenv").config();
// Import RabbitMQ consumer
const consumeMessages = require("./rabbitmq/notificationConsumer"); // Import the consumer function

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Call the function to connect to MongoDB

app.use("/api", eventRoutes);
const PORT = 5009;

// Start Express server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Start RabbitMQ Consumer in the background
consumeMessages();