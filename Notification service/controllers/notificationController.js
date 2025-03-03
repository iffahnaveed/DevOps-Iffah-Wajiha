// 
const Event = require("../models/notify");

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { event_name, date, time } = req.body;
        const newEvent = new Event({ event_name, date, time });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getEvents, createEvent };
