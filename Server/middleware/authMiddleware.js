const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided.");
    return res.status(401).json({ error: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token Verified:", decoded);
    next();
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = { protect, authorize };
// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Bearer token

//   if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // You can access user id, role, etc.
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// module.exports = auth;
