const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(`mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/taskmanager?retryWrites=true&w=majority`);

module.exports = {
  connection,
};
