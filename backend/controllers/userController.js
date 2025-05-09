// importing the various function from model

const {
  findUserByEmail,
  getAllUsers,
  getUsersByAdmin,
  deleteUserById,
  getUserParent,
} = require("../models/userModel");

// get users help to fetch users it checks superadmin and admin and by conditon return all user
const getUsers = async (req, res) => {
  const { role, id } = req.user;

  try {
    let users;
    if (role === "superadmin") {
      users = await getAllUsers();
    } else {
      users = await getUsersByAdmin(id);
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", err });
  }
};
// this is function to delete a user if superadmin it can delete all

const deleteUser = async (req, res) => {
  const { role, id: requesterId } = req.user;
  const { id: targetId } = req.params;

  try {
    if (role === "superadmin") {
      const deleted = await deleteUserById(targetId);
      return res.status(200).json({ msg: "User deleted", deleted });
    }

    const target = await getUserParent(targetId);
    if (target?.parent_id !== requesterId) {
      return res.status(403).json({ msg: "Unauthorized to delete this user" });
    }

    const deleted = await deleteUserById(targetId);
    res.status(200).json({ msg: "User deleted", deleted });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user", err });
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
