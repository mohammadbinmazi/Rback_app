const { pool } = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (name, email, hashedPassword, role, parentId) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, hashedPassword, role, parentId]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUsersByAdmin = async (adminId) => {
  const result = await pool.query("SELECT * FROM users WHERE parent_id = $1", [
    adminId,
  ]);
  return result.rows;
};

const deleteUserById = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const getUserParent = async (userId) => {
  const result = await pool.query("SELECT parent_id FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  getUsersByAdmin,
  deleteUserById,
  getUserParent,
};
