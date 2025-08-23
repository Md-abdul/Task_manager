const express = require("express");
const router = express.Router();
const { ProjectModel } = require("../model/project.model");
const jwt = require("jsonwebtoken");

// Middleware to authenticate the user
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

// Create a new project
router.post("/createproject", authenticate, async (req, res) => {
  try {
    const project = new ProjectModel({
      ...req.body,
      user: req.user.authorID, 
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all projects for the authenticated user
router.get("/get", authenticate, async (req, res) => {
  try {
    const projects = await ProjectModel.find({ user: req.user.authorID });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific project by ID for the authenticated user
router.get("/:id", authenticate, async (req, res) => {
  try {
    const project = await ProjectModel.findOne({ _id: req.params.id, user: req.user.authorID });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific project by ID for the authenticated user
router.put("/update/:id", authenticate, async (req, res) => {
  try {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.authorID },
      req.body,
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific project by ID for the authenticated user
router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const deletedProject = await ProjectModel.findOneAndDelete({ _id: req.params.id, user: req.user.authorID });
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
