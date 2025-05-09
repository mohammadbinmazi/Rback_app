const { pool } = require("../config/db");

// this model find the user by the email

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
// this model create a new user in database
const createUser = async (name, email, hashedPassword, role, parentId) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, hashedPassword, role, parentId]
  );
  return result.rows[0];
};

// it will get all the users

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

//  it will return the ids by parent_id

const getUsersByAdmin = async (adminId) => {
  const result = await pool.query("SELECT * FROM users WHERE parent_id = $1", [
    adminId,
  ]);
  return result.rows;
};

// it will delete a user by id

const deleteUserById = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

// it will fetch parent id of the user

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
