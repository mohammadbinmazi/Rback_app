const jwt = require("jsonwebtoken");
// auth middleware check jwt tokens
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const secretKey =
      "1221f2b0562b6dca7e61ef64570ea2f6319baa19af6effd5cf1a7a736a9a77b70e81204e986ef75fa8a4c42095bc74c7d99eb18b45d52b520159d2c963914351";
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
