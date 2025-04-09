const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register a new user
// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    console.log("🔹 Incoming Password:", password);

    // 🚀 No need to hash password here, Mongoose middleware will do it
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    const savedUser = await User.findOne({ email });
    console.log("🔹 Stored Hashed Password (After Save):", savedUser.password);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});



// Login a user
router.post("/login", async (req, res) => {
 
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
