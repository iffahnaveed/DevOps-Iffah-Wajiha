const User = require("../models/User"); // Adjust the path based on your project structure

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Create user without hashing password
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    // Save user in database with plain-text password ❌ (Not secure)
    const newUser = await User.create({
      name,
      email,
      password, // Password stored as plain text (not recommended)
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const bcrypt = require("bcrypt");

// Login user (Check password without hashing)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    // ✅ Compare password directly (no hashing)
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getUsers, createUser, loginUser };
