const jwt = require('jsonwebtoken');
const ApiErrors = require('../utils/ApiErrors');
const secret_key = process.env.ACCESS_TOKEN_SECRET;

const verifyJwt = (req, res, next) => {
  const authheader = req.headers.authorization; 
  if (!authheader || !authheader.startsWith("Bearer ")) {
    throw new ApiErrors(401, "Token not valid or available");
  }

  try {
    const token = authheader.split(" ")[1]; 

    const decoded = jwt.verify(token, secret_key); 

    req.user = decoded; 
    next(); 
  } catch (err) {
    throw new ApiErrors(401, "Invalid or expired token");
  }
};

module.exports = verifyJwt;
