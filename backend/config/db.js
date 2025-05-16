const dotenv = require("dotenv");
const { Pool } = require("pg");
// importing the pool from pg to add connection
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "rbac_app",
//   password: "arabbinmazi",
//   port: "5432",
// });

// const connectDB = async () => {
//   try {
//     await pool.connect();
//     console.log("Database connected succesfully");
//   } catch (err) {
//     console.log("error while connecting the database", err);
//     process.exit(1);
//   }
// };

// module.exports = { pool, connectDB };
