const express = require("express");
const router = express.Router();
const sequelize = require("../config/database"); // Corrected import path
const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "notifications";

// Function to publish message to RabbitMQ
const publishToQueue = async (message) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });

        console.log("📤 Sent to Queue:", message);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("❌ RabbitMQ Publish Error:", error);
    }
};

router.post("/", async (req, res) => {
    let { bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email } = req.body;

    try {
        const result = await sequelize.query(
            `INSERT INTO "Payments"
            (bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email)
            VALUES (:bookingId, :eventId, :userId, :ticketCount, :cardHolderName, :cardNumber, :expiryDate, :cvv, :email)
            RETURNING id, bookingId, eventId, userId, ticketCount, cardHolderName, email, paymentStatus, createdAt;`,
            {
                replacements: { bookingId, eventId, userId, ticketCount, cardHolderName, cardNumber, expiryDate, cvv, email },
                type: sequelize.QueryTypes.INSERT,
            }
        );
        
        // ✅ Correct way to extract data
        const payment = result[0][0]; // Get the first row from the result
        
        console.log("✅ Payment Inserted:", payment);
        
        // Publish the correct values to RabbitMQ
        await publishToQueue({
            bookingId: payment.bookingid,   // Make sure column names match the database
            userEmail: payment.email,
            eventId: payment.eventid,
            status: "CONFIRMED",
        });
        res.status(201).json({ success: true, payment });
    } catch (err) {
        console.error("🔥 Payment Error:", err.message);
        res.status(500).json({ error: "Database error", details: err.message });
    }
});

module.exports = router;