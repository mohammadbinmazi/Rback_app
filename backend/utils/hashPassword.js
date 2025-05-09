const bcrypt = require("bcryptjs");

// hashpassword bcrypt the password of the user

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

// compare password compare the password bycrypt version vs real

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
