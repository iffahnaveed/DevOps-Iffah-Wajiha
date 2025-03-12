const amqp = require("amqplib");
const mongoose = require("mongoose");
const Notification = require("../models/notifications"); // Adjusted path for the Notification model

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "notifications";

// Function to consume messages
const consumeMessages = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log("🚀 Waiting for messages...");

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log("📩 Received Message:", message);

                const { bookingId, userEmail, eventId, status } = message;

                const newNotification = new Notification({
                    booking_id: bookingId,
                    user_email: userEmail,
                    event_id: eventId, // Changed from event_name to event_id
                    status: status,
                    notification_sent: false,
                });

                await newNotification.save();
                console.log("✅ Notification Saved:", newNotification);

                // Acknowledge message
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
};

// ✅ Properly export the function
module.exports = consumeMessages;