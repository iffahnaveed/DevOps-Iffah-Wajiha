module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.STRING,  // Ensure type matches DB column type
      allowNull: false,
      field: "eventid",  // ✅ Explicit mapping
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "userid", // ✅ Explicit mapping
    },
    numberOfTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "numberoftickets",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "unpaid",
      field: "paymentstatus",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "createdat",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updatedat",
    },
  }, {
    tableName: "bookings", // ✅ Ensures Sequelize uses lowercase table name
    timestamps: false, // If your DB handles timestamps
  });

  return Booking;
};