const { getUserParent } = require("../models/userModel");

const checkRoleAccess = (roles) => (req, res, anext) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

const verifyOwnershipOrSuperadmin = async (req, res, next) => {
  const { role, id: requesterId } = req.user;
  const { id: targetId } = req.params;

  if (role === "superadmin") return next();

  const target = await getUserParent(targetId);
  if (target?.parent_id !== requesterId) {
    return res.status(403).json({ msg: "Unauthorized to delete this user" });
  }

  next();
};

module.exports = { checkRoleAccess, verifyOwnershipOrSuperadmin };
