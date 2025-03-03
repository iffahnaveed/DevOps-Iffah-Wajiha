const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database"); // Import database connection
const eventRoutes = require("./routes/notifyroutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Call the function to connect to MongoDB

app.use("/api", eventRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
