const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availableTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "availabletickets",  // ✅ Ensure Sequelize maps to the correct column
  },
}, {
  tableName: "events",
  timestamps: false,  // ✅ This disables `createdAt` and `updatedAt`
});

module.exports = Event;
