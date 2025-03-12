const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_name: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Event", EventSchema);
