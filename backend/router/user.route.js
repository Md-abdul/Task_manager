const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  const { name, pass, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email is already registered" });
    }

    bcryptjs.hash(pass, 5, async (err, hash) => {
      if (err)
        return res.status(500).send({ msg: "Error in hashing password" });
      const user = new userModel({ name, email, pass: hash });
      await user.save();
      res.status(201).send({ msg: "New user registered successfully" });
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcryptjs.compare(pass, user.pass, (err, result) => {
        if (err)
          return res.status(500).send({ msg: "Error comparing passwords" });
        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.name },
            process.env.JWT_SECRET || "masaiII"
          );
          res.status(200).send({ msg: "Login successful", token ,name: user.name, email: user.email });
        } else {
          res.status(401).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(401).send({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(500).send({ err: "Some error occurred during login" });
  }
});

userRouter.get("/singleuser", async (req, res) => {
  try {
    const { authorID } = req.user;
    const user = await userModel.findById(authorID);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ err: "Error fetching user data" });
  }
});

module.exports = { userRouter };
