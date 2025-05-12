// importing the various function from model

// const {
//   findUserByEmail,
//   getAllUsers,
//   getUsersByParent,
//   deleteUserById,
//   getUserParent,
//   getAllDescendantUsers,
//   updateUser,
// } = require("../models/userModel");

// const getUsers = async (req, res) => {
//   const { role, id } = req.user;

//   try {
//     let users;
//     if (role === "superadmin") {
//       users = await getAllUsers();
//     } else {
//       users = await getAllDescendantUsers(id); // ✅ Recursively get all sub-users
//     }

//     res.status(200).json({ users });
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ msg: "Error fetching users", err });
//   }
// };

// // this is function to delete a user if superadmin it can delete all

// const deleteUser = async (req, res) => {
//   const { role, id: requesterId } = req.user;
//   const { id: targetId } = req.params;

//   try {
//     if (role === "superadmin") {
//       const deleted = await deleteUserById(targetId);
//       return res.status(200).json({ msg: "User deleted", deleted });
//     }

//     // Fetch all users this user has created (including deep)
//     const descendants = await getAllDescendantUsers(requesterId);

//     // Check if the target user is within their scope
//     const allowedToDelete = descendants.some(
//       (user) => user.id === parseInt(targetId)
//     );

//     if (!allowedToDelete) {
//       return res.status(403).json({ msg: "Unauthorized to delete this user" });
//     }

//     const deleted = await deleteUserById(targetId);
//     res.status(200).json({ msg: "User deleted", deleted });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({ msg: "Error deleting user", err });
//   }
// };
// const editUser = async (req, res) => {
//   const { role, id: requesterId } = req.user;
//   const { id: targetId } = req.params;
//   const { name, email, role: newRole } = req.body;

//   try {
//     let allowedToEdit = false;

//     // Superadmin can edit anyone
//     if (role === "superadmin") {
//       allowedToEdit = true;
//     }

//     // Admin can edit users they created
//     else if (role === "admin") {
//       const targetUser = await findUserByEmail(targetId);
//       if (targetUser && targetUser.parent_id === requesterId) {
//         allowedToEdit = true;
//       }
//     }

//     // Manager can edit staff they created
//     else if (role === "manager") {
//       const targetUser = await findUserByEmail(targetId);
//       if (
//         targetUser &&
//         targetUser.parent_id === requesterId &&
//         targetUser.role === "staff"
//       ) {
//         allowedToEdit = true;
//       }
//     }

//     // Staff and Cashier cannot edit anyone
//     else if (role === "staff" || role === "cashier") {
//       allowedToEdit = false;
//     }

//     if (!allowedToEdit) {
//       return res.status(403).json({ msg: "Unauthorized to edit this user" });
//     }

//     // Update user if allowed, using the model's update function
//     const updatedUser = await updateUser(targetId, name, email, newRole);

//     return res.status(200).json({ msg: "User updated", updatedUser });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     return res.status(500).json({ msg: "Error updating user", err });
//   }
// };

// module.exports = {
//   getUsers,
//   deleteUser,
//   editUser,
// };
const {
  findUserByEmail,
  getAllUsers,
  getUsersByParent,
  deleteUserById,
  getUserParent,
  getAllDescendantUsers,
  updateUserById,
} = require("../models/userModel");

const getUsers = async (req, res) => {
  const { role, id } = req.user;

  try {
    let users;
    if (role === "superadmin") {
      users = await getAllUsers();
    } else {
      users = await getAllDescendantUsers(id); // ✅ Recursively get all sub-users
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Error fetching users", err });
  }
};

// This function handles deleting a user
const deleteUser = async (req, res) => {
  const { role, id: requesterId } = req.user;
  const { id: targetId } = req.params;

  try {
    if (role === "superadmin") {
      const deleted = await deleteUserById(targetId);
      return res.status(200).json({ msg: "User deleted", deleted });
    }

    // Fetch all users this user has created (including deep)
    const descendants = await getAllDescendantUsers(requesterId);

    // Check if the target user is within their scope
    const allowedToDelete = descendants.some(
      (user) => user.id === parseInt(targetId)
    );

    if (!allowedToDelete) {
      return res.status(403).json({ msg: "Unauthorized to delete this user" });
    }

    const deleted = await deleteUserById(targetId);
    res.status(200).json({ msg: "User deleted", deleted });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ msg: "Error deleting user", err });
  }
};

// This function handles updating a user's information
const editUser = async (req, res) => {
  const { role, id: requesterId } = req.user;
  const { id: targetId } = req.params;
  const { name, email, role: newRole } = req.body;

  try {
    if (role === "superadmin") {
      // Superadmins can edit any user
      const updatedUser = await updateUserById(targetId, {
        name,
        email,
        role: newRole,
      });
      return res.status(200).json({ msg: "User updated", updatedUser });
    }

    // Admin/Manager can only edit users within their hierarchy
    const descendants = await getAllDescendantUsers(requesterId);
    const canEdit = descendants.some((user) => user.id === parseInt(targetId));

    if (!canEdit) {
      return res.status(403).json({ msg: "Unauthorized to edit this user" });
    }

    // Update user details
    const updatedUser = await updateUserById(targetId, {
      name,
      email,
      role: newRole,
    });
    res.status(200).json({ msg: "User updated", updatedUser });
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).json({ msg: "Error editing user", err });
  }
};

module.exports = { getUsers, deleteUser, editUser };
