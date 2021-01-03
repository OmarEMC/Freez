const mongoose = require("mongoose");

const User = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  tag: String,
  avatar: String,
  api: {
    key: String
  },
  requests: {
    last: {
      date: String,
      to: String
    },
    total: { type: Number, default: 0 },
    corazon: { type: Number, default: 0 },
    fallar: { type: Number, default: 0 },
    screenshot: { type: Number, default: 0 },
    internet: { type: Number, default: 0 },
    obradearte: { type: Number, default: 0 },
    turner_web: { type: Number, default: 0 },
    triturar: { type: Number, default: 0 }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("User", User);