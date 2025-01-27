const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  day: { type: Date, required: true },
  processed: { type: Number, default: 0, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, sparse: true, unique: true, required: false },
  password_hash: { type: String, required: false },
  type: {
    type: String,
    enum: ["anonymous", "free", "premium"],
    default: "free",
    required: true,
  },
  operations: { type: [daySchema], required: true, default: [] },
});

module.exports = mongoose.model("user", userSchema);
