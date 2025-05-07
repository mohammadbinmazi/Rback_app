const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secretKey =
    "1221f2b0562b6dca7e61ef64570ea2f6319baa19af6effd5cf1a7a736a9a77b70e81204e986ef75fa8a4c42095bc74c7d99eb18b45d52b520159d2c963914351";

  const payload = { id: user.id, email: user.email, role: user.role };

  return jwt.sign(payload, secretKey);
};

module.exports = generateToken;
