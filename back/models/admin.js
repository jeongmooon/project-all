const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminModels = new Schema({
  adminId: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt :{
    type :String,
    required:true,
  },
  signinCount:{
    type: Number,
    default:0
  },
  lockAccount:{
    type:Boolean,
    default:false
  },
  createDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminModels);
