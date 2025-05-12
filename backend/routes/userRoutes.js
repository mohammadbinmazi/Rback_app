const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  editUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  checkRoleAccess,
  verifyOwnershipOrSuperadmin,
} = require("../middlewares/roleMiddleware");

// Route for getting users (only accessible by superadmins and admins)
router.get(
  "/",
  authMiddleware,
  checkRoleAccess(["superadmin", "admin", "manager"]),
  getUsers
);

// Route for deleting a user (only accessible by superadmins or the user themselves)
router.delete("/:id", authMiddleware, verifyOwnershipOrSuperadmin, deleteUser);

router.put("/:id", authMiddleware, verifyOwnershipOrSuperadmin, editUser);

module.exports = router;
