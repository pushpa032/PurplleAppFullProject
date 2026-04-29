const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RegisterSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
  type: Date,
  default: Date.now
},

timestamps: true,  //automatically  gives the createdAt and updatedAt

});


const RegisterModel = mongoose.model("register", RegisterSchema);

module.exports = RegisterModel;