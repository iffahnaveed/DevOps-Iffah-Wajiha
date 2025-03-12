const Notification = require("../models/notifications");

// Get all notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Get a specific notification by booking ID
const getNotificationByBookingId = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const notification = await Notification.findOne({ booking_id });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getNotifications, getNotificationByBookingId };