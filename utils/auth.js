const jwt = require("jsonwebtoken");
require("dotenv").config();

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  return payload;
}
module.exports = {
  validateToken,
  createTokenForUser,
};
