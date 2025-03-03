const Event = require("../models/Event");

const getEvents = async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      console.error("❌ Database Error:", error.message);
      res.status(500).json({ error: "Database error while fetching events", details: error.message });
    }
  };  
module.exports = { getEvents };
