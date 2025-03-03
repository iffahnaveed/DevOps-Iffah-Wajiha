const express = require("express");
const { getUsers, createUser, loginUser } = require("../controllers/userController");

const router = express.Router();
router.get("/users", getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser); // 👈 Add the login route

module.exports = router;
