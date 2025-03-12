const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const dbName = "eventservice";
const collectionName = "event";

router.get("/events", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const events = await collection.find().toArray();
        res.json(events); // Send data as JSON response
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    } finally {
        await client.close();
    }
});

module.exports = router;
