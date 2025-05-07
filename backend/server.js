const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./config/db");

app.use(express.json());

// Connect to the database
connectDB();

// Route for authentication
app.use("/api/auth", authRoutes);

// Route for user management
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
