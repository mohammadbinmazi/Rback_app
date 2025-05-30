// const { pool } = require("../config/db");

// // this model find the user by the email

// const findUserByEmail = async (email) => {
//   const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);
//   return result.rows[0];
// };
// // this model create a new user in database
// const createUser = async (name, email, hashedPassword, role, parentId) => {
//   const result = await pool.query(
//     "INSERT INTO users (name, email, password, role, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//     [name, email, hashedPassword, role, parentId]
//   );
//   return result.rows[0];
// };

// // it will get all the users

// const getAllUsers = async () => {
//   const result = await pool.query("SELECT * FROM users");
//   return result.rows;
// };

// //  it will return the ids by parent_id

// // ✅ it will return users created by a parent (admin, manager, etc.)
// const getUsersByParent = async (parentId) => {
//   const result = await pool.query("SELECT * FROM users WHERE parent_id = $1", [
//     parentId,
//   ]);
//   return result.rows;
// };

// // it will get all the users based on the user's role

// // it will delete a user by id
// // Get all descendants (recursive)
// const getAllDescendantUsers = async (userId) => {
//   const result = await pool.query(
//     `
//     WITH RECURSIVE descendants AS (
//       SELECT * FROM users WHERE parent_id = $1
//       UNION
//       SELECT u.* FROM users u
//       INNER JOIN descendants d ON u.parent_id = d.id
//     )
//     SELECT * FROM descendants;
//     `,
//     [userId]
//   );

//   return result.rows;
// };

// const deleteUserById = async (id) => {
//   const result = await pool.query(
//     "DELETE FROM users WHERE id = $1 RETURNING *",
//     [id]
//   );
//   return result.rows[0];
// };

// // it will fetch parent id of the user

// const getUserParent = async (userId) => {
//   const result = await pool.query("SELECT parent_id FROM users WHERE id = $1", [
//     userId,
//   ]);
//   return result.rows[0];
// };
// const updateUserById = async (id, updatedFields) => {
//   const existingUserRes = await pool.query(
//     "SELECT * FROM users WHERE id = $1",
//     [id]
//   );

//   if (existingUserRes.rows.length === 0) {
//     throw new Error("User not found");
//   }

//   const existingUser = existingUserRes.rows[0];

//   // Merge existing data with updated fields
//   const name = updatedFields.name || existingUser.name;
//   const email = updatedFields.email || existingUser.email;
//   const role = updatedFields.role || existingUser.role;

//   const result = await pool.query(
//     "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
//     [name, email, role, id]
//   );

//   return result.rows[0];
// };
// const getUserById = async (id) => {
//   const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//   return result.rows[0];
// };

// module.exports = {
//   findUserByEmail,
//   createUser,
//   getAllUsers,
//   getUsersByParent,
//   deleteUserById,
//   getUserParent,
//   getAllDescendantUsers,
//   updateUserById,
//   getUserById,
// };
const { pool } = require("../config/db");

// this function will return a selected email

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users where email=$1", [
    email,
  ]);
  return result.rows[0];
};
const createUser = async (name, email, hashedPassword, role, parentId) => {
  const result = await pool.query(
    "INSERT INTO users (name,email,password,role,parent_id) VALUES($1,$2,$3,$4,$5)RETURNING *",
    [name, email, hashedPassword, role, parentId]
  );
  return result.rows[0];
};
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
const getUsersByParent = async (parentId) => {
  const result = await pool.query("SELECT * from users where parent_id = $1", [
    parentId,
  ]);
  return result.rows;
};
const deleteUserById = async (id) => {
  const result = await pool.query("DELETE from users where id=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};
const getUserParent = async (userid) => {
  const result = await pool.query("select parent_id from users where id = $1", [
    userid,
  ]);
  return result.rows[0];
};
const getAllDescendantUsers = async (userid) => {
  const result = await pool.query(
    `WITH RECURSIVE descendants AS(SELECT * FROM users WHERE parent_id = $1
       UNION     SELECT u.* FROM users u
       INNER JOIN descendants d ON u.parent_id = d.id)
       SELECT * from descendants`,
    [userid]
  );
  return result.rows;
};
const updateUserById = async (id, updatedFields) => {
  const existingUserRes = await pool.query(
    "SELECT * from users where id =$1 ",
    [id]
  );
  if (existingUserRes.rows.length === 0) {
    throw new Error("user not found");
  }
  const existingUser = existingUserRes.rows[0];
  // merger existing data with updated data
  const name = updatedFields.name || existingUser.name;
  const email = updatedFields.email || existingUser.email;
  const role = updatedFields.role || existingUser.role;
  const result = await pool.query(
    "UPDATE users SET name=$1 , email=$2, role=$3 where id=$4 RETURNING *",
    [name, email, role, id]
  );
  return result.rows[0];
};
const getUserById = async (id) => {
  const result = await pool.query("SELECT * from users where id=$1", [id]);
  return result.rows[0];
};
module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  getUsersByParent,
  deleteUserById,
  getUserParent,
  getAllDescendantUsers,
  updateUserById,
  getUserById,
};
