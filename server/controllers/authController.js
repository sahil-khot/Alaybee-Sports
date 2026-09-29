const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dummyAccounts = require("../data/dummyAccounts");
const { isDbConnected } = require("../config/db");

// Helper to generate JWT
const generateToken = (id, role, email) => {
  return jwt.sign(
    { id, role, email },
    process.env.JWT_SECRET || "alaybee_sports_super_secret_jwt_key_2026_sports",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // If MongoDB Atlas is connected
    if (isDbConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: "An account with this email already exists" });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: role === "athlete" ? "athlete" : "user",
        phone: phone || "",
        city: city || "",
      });

      const token = generateToken(user._id, user.role, user.email);

      return res.status(201).json({
        success: true,
        message: "Registration successful!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          city: user.city,
        },
      });
    }

    // In-memory demo mode if Atlas not yet configured
    const token = generateToken("demo-new-user-id", role || "user", email);
    return res.status(201).json({
      success: true,
      message: "Registration successful (Atlas connection pending - in demo mode)",
      token,
      user: {
        id: "demo-new-user-id",
        name,
        email: email.toLowerCase(),
        role: role === "athlete" ? "athlete" : "user",
        phone: phone || "",
        city: city || "",
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Server error during registration" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check if database is connected
    if (isDbConnected()) {
      const user = await User.findOne({ email: cleanEmail });

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.role, user.email);
        return res.json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            city: user.city,
          },
        });
      }

      // Check dummy accounts fallback
      const dummy = dummyAccounts.find(
        (a) => a.email.toLowerCase() === cleanEmail && a.password === password
      );
      if (dummy) {
        const token = generateToken("dummy-id-" + dummy.role, dummy.role, dummy.email);
        return res.json({
          success: true,
          message: "Logged in via dummy account",
          token,
          user: {
            id: "dummy-id-" + dummy.role,
            name: dummy.name,
            email: dummy.email,
            role: dummy.role,
            phone: dummy.phone,
            city: dummy.city,
          },
        });
      }

      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Demo fallback if MongoDB Atlas is not yet connected
    const dummy = dummyAccounts.find(
      (a) => a.email.toLowerCase() === cleanEmail && a.password === password
    );

    if (dummy) {
      const token = generateToken("dummy-id-" + dummy.role, dummy.role, dummy.email);
      return res.json({
        success: true,
        message: "Logged in via dummy account (Demo Mode)",
        token,
        user: {
          id: "dummy-id-" + dummy.role,
          name: dummy.name,
          email: dummy.email,
          role: dummy.role,
          phone: dummy.phone,
          city: dummy.city,
        },
      });
    }

    return res.status(401).json({
      message: "Invalid credentials. Use one of the Quick Demo Logins or check your password.",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message || "Server error during login" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private (Protected by JWT)
const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private (Protected by JWT)
const updateProfile = async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    if (isDbConnected() && req.user._id) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = name || user.name;
        user.phone = phone !== undefined ? phone : user.phone;
        user.city = city !== undefined ? city : user.city;
        const updated = await user.save();

        return res.json({
          success: true,
          message: "Profile updated successfully",
          user: {
            id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            phone: updated.phone,
            city: updated.city,
          },
        });
      }
    }

    // In demo / fallback
    const updated = {
      ...req.user,
      name: name || req.user.name,
      phone: phone !== undefined ? phone : req.user.phone,
      city: city !== undefined ? city : req.user.city,
    };

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// @desc    Get available demo accounts for quick testing
// @route   GET /api/auth/demo-accounts
// @access  Public
const getDemoAccounts = async (req, res) => {
  res.json({
    success: true,
    accounts: dummyAccounts.map((a) => ({
      name: a.name,
      email: a.email,
      password: a.password,
      role: a.role,
      description: a.description,
    })),
  });
};

// @desc    Example athlete-only authorized perk endpoint
// @route   GET /api/auth/athlete-perks
// @access  Private (Authorized for athlete role only)
const getAthletePerks = async (req, res) => {
  res.json({
    success: true,
    message: "Authorized access granted to Pro Athlete Lounge!",
    perks: [
      "25% Exclusive Discount on Pro-Grade Cricket & Football Kits",
      "Priority Same-Day Dispatch for Tournament Emergencies",
      "Free Custom Jersey Printing & Club Embroidery Consultation",
    ],
  });
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  getDemoAccounts,
  getAthletePerks,
};
