const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  getDemoAccounts,
  getAthletePerks,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/demo-accounts", getDemoAccounts);

// Protected routes (require valid JWT)
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

// Role-authorized route (demonstrates athlete authorization)
router.get("/athlete-perks", protect, authorize("athlete"), getAthletePerks);

module.exports = router;
