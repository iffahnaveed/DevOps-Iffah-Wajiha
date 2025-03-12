const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Load environment variables

// 🔹 Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("🔥 Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Create User (Sign-up without password hashing)
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    // ❌ No password hashing, store it directly
    const newUser = await User.create({
      name,
      email,
      password, // Storing plain text password (⚠ Not recommended for production)
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("🔥 Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Return userId along with token
    res.json({
      message: "Login successful",
      token,
      userId: user.id,  // 🔹 Add this to response
      redirectUrl: "http://localhost:5174/", // Change to actual microservice URL
    });

  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getUsers, createUser, loginUser };