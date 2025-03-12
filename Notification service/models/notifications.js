const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  booking_id: Number,  // Use Number instead of integer
  user_email: String,
  event_id: String,  // Changed from event_name to event_id
  status: String,
  notification_sent: Boolean,
});
module.exports = mongoose.model("Notification", NotificationSchema);