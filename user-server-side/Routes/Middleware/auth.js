const jwt = require("jsonwebtoken");

// Middleware function auth verifies JWT tokens from cookies for user authentication in protected routes, 
// logging token details and handling errors.
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECURE_KEY);
    console.log(verifyUser, "verify token");
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
module.exports = auth;
