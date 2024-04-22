// const express = require("express");
// const taskRoute = express.Router();
// const { taskModel } = require("../model/task.model");

// taskRoute.post("/create", async (req, res) => {
//   try {
//     const note = new taskModel(req.body);
//     await note.save();
//     res.send({ msg: "New Task created successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// taskRoute.get("/", async (req, res) => {
//   try {
//     const users = await taskModel.find({ authorID: req.body.authorID });
//     res.send(users);
//   } catch (err) {
//     console.log({ err: err.message });
//   }
// });

// taskRoute.patch("/update/:taskID", async (req, res) => {
//   const { taskID } = req.params;
//   try {
//     //------------------------------------------> ,authorID: req.body.authorID
//     await taskModel.findByIdAndUpdate({ _id: taskID }, req.body);
//     res.json({ msg: `The note with ${taskID} has been updated` });
//   } catch (err) {
//     console.log(err);
//   }
// });

// taskRoute.delete("/delete/:taskID", async (req, res) => {
//   const { taskID } = req.params;
//   try {
//     //------------------------------------------> ,authorID: req.body.authorID
//     await taskModel.findByIdAndDelete({ _id: taskID });
//     res.json({ msg: `The note with ${taskID} has been deleted` });
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Getting error " });
//   }
// });

// module.exports = {
//   taskRoute,
// };



const express = require("express");
const taskRoute = express.Router();
const { taskModel } = require("../model/task.model");

taskRoute.post("/create", async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.send({ msg: "New Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.get("/", async (req, res) => {
  try {
    const tasks = await taskModel.find({ authorID: req.body.authorID });
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.patch("/update/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    await taskModel.findByIdAndUpdate(taskID, req.body);
    res.json({ msg: `The task with ID ${taskID} has been updated` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

taskRoute.delete("/delete/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    await taskModel.findByIdAndDelete(taskID);
    res.json({ msg: `The task with ID ${taskID} has been deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal Server Error" });
  }
});

module.exports = {
  taskRoute,
};
