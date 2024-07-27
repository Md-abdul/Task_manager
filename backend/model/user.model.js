const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
