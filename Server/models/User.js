const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["admin", "customer"], default: "customer" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
