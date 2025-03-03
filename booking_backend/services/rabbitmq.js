const amqp = require("amqplib");
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("paymentQueue");
    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("❌ RabbitMQ connection failed:", error);
  }
};

// Send a message to the queue
const sendToQueue = (data) => {
  if (channel) {
    channel.sendToQueue("paymentQueue", Buffer.from(JSON.stringify(data)));
    console.log("📩 Message sent to payment queue", data);
  }
};

// Process messages from the queue
const consumeQueue = async () => {
  if (channel) {
    channel.consume("paymentQueue", async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("✅ Processing Payment:", data);
        channel.ack(msg);
      }
    });
  }
};

module.exports = { connectRabbitMQ, sendToQueue, consumeQueue };
