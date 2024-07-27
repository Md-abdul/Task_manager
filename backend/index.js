const express = require("express");
const app = express();
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./router/user.route");
const { route } = require("./router/task.route");
const router = require("./router/task.route");
const taskModel = require("./model/task.model");
const adminroutes = require("./router/admin.route");
const port = 5050
app.use(cors());
app.use(express.json());


require("dotenv").config();

app.use("/", (req, res) => {
  res.json({ msg: "welcom to task manager backend" });
});

app.use("/admin", adminroutes);
app.use("/users", userRouter);
app.use("/task", router);



app.listen(port || 5000, async () => {
  try {
    await connection;
    console.log("Connection established port 5050");
  } catch (err) {
    console.log(err);
  }
});
