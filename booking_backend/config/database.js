const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = sequelize;
