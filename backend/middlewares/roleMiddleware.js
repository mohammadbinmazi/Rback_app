// const { getUserParent } = require("../models/userModel");

// const checkRoleAccess = (roles) => (req, res, next) => {
//   const { role } = req.user;
//   if (!roles.includes(role)) {
//     return res.status(403).json({ msg: "Access denied" });
//   }
//   next();
// };
// // it verify the verifyOwnershipOrSuperadmin

// const verifyOwnershipOrSuperadmin = async (req, res, next) => {
//   const { role, id: requesterId } = req.user;
//   const { id: targetId } = req.params;

//   if (role === "superadmin") return next();

//   const target = await getUserParent(targetId);
//   if (target?.parent_id !== requesterId) {
//     return res.status(403).json({ msg: "Unauthorized to delete this user" });
//   }

//   next();
// };

// module.exports = { checkRoleAccess, verifyOwnershipOrSuperadmin };
const { getAllDescendantUsers, getUserParent } = require("../models/userModel");

// Middleware to check if the user has the correct role
const checkRoleAccess = (roles) => (req, res, next) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

// Middleware to verify ownership or superadmin access
const verifyOwnershipOrSuperadmin = async (req, res, next) => {
  const { role, id: requesterId } = req.user;
  const { id: targetId } = req.params;

  // Superadmin can edit any user
  if (role === "superadmin") {
    return next();
  }

  // Admin, Manager, etc., can only edit users within their hierarchy
  try {
    // Fetch all descendants for the requester
    const descendants = await getAllDescendantUsers(requesterId);

    // Check if the target user is within the descendants of the requester
    const canEdit = descendants.some((user) => user.id === parseInt(targetId));

    if (!canEdit) {
      return res.status(403).json({ msg: "Unauthorized to edit this user" });
    }

    // Allow the action to proceed
    next();
  } catch (err) {
    console.error("Error verifying ownership:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { checkRoleAccess, verifyOwnershipOrSuperadmin };
