const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes);
sequelize.sync().then(() => {
  console.log("✅ Database synced!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
