const { Pool } = require("pg");
// importing the pool from pg to add connection

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rbac_app",
  password: "arabbinmazi",
  port: 5432,
});
// connection is established with postgresql

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};
// connect db is used to show on console log database is connected

module.exports = { pool, connectDB };
