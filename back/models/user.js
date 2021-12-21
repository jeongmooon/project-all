const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersModels = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", usersModels);
