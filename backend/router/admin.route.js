const express = require("express");
const adminroutes = express.Router();
const { taskModel } = require("../model/task.model");
const { userModel } = require("../model/user.model");

adminroutes.get("/all-tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find().populate("user");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

adminroutes.get("/all-users", async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = adminroutes;
