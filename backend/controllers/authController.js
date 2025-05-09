// importing the various functions from models and utils

const { findUserByEmail, createUser } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

// creating the registeration function for registering the new users

const register = async (req, res) => {
  try {
    const { name, email, password, role, parent_id } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await hashPassword(password);
    const user = await createUser(name, email, hashed, role, parent_id);
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

// login function for already exists users

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

module.exports = { register, login };
