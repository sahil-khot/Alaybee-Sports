const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dummyAccounts = require("../data/dummyAccounts");
const { isDbConnected } = require("../config/db");

// Protect routes - verifies JWT token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "alaybee_sports_super_secret_jwt_key_2026_sports"
      );

      // Check DB if connected, otherwise fallback for quick testing
      if (isDbConnected()) {
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
          return res.status(401).json({ message: "User not found with this token" });
        }
        req.user = user;
      } else {
        // Fallback for seamless demo account testing
        const fallback = dummyAccounts.find(
          (acc) => acc.email === decoded.email || acc.role === decoded.role
        );
        req.user = fallback
          ? {
              _id: decoded.id || "demo-id",
              name: fallback.name,
              email: fallback.email,
              role: fallback.role,
              phone: fallback.phone,
              city: fallback.city,
              avatar: fallback.avatar || "",
            }
          : { _id: decoded.id, email: decoded.email, role: decoded.role, avatar: "" };
      }

      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user?.role || "guest"}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
