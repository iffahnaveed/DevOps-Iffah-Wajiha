const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  booking_id: String,
  user_email: String,
  event_name: String,
  status: String,
  notification_sent: Boolean,
});

module.exports = mongoose.model("Notification", NotificationSchema);
