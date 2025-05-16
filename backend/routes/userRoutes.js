const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
  editUser,
  getUserByIdController,
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
router.get(
  "/:id",
  authMiddleware,
  checkRoleAccess(["superadmin", "admin", "manager"]),
  getUserByIdController
);

module.exports = router;
