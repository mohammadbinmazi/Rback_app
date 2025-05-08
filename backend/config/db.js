const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rbac_app",
  password: "arabbinmazi",
  port: 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
