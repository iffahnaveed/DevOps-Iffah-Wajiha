const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const dbName = "notifyservice";  // ✅ Change to notification DB
const collectionName = "notify"; // ✅ Collection in your DB

router.get("/notifications", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const notifications = await collection.find().toArray();
        res.json(notifications); // Send data as JSON response
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    } finally {
        await client.close();
    }
});

module.exports = router;
