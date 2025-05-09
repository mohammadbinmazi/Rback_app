const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// creating the routes for register and login

router.post("/register", register);
router.post("/login", login);

module.exports = router;
