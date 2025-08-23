const mongoose = require("mongoose");
const { userModel } = require("./user.model");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = {
  ProjectModel,
};
