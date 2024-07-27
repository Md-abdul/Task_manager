const express = require("express");
const router = express.Router();
const { taskModel } = require("../model/task.model");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");

// Middleware 
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "masaiII");
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).send({ message: "Authentication failed" });
  }
};

router.post("/createtask", authenticate, async (req, res) => {
  try {
    const task = new taskModel({
      ...req.body,
      user: req.user.authorID, 
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get", authenticate, async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user.authorID }).populate("user");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const task = await taskModel.findOne({ _id: req.params.id, user: req.user.authorID }).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", authenticate, async (req, res) => {
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.authorID },
      req.body,
      { new: true }
    ).populate("user");
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const deletedTask = await taskModel.findOneAndDelete({ _id: req.params.id, user: req.user.authorID });
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
