const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ensure correct path

const Booking = require("./booking")(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Booking = Booking;

module.exports = db;
