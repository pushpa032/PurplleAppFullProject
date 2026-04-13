const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  mobile: {
    type: String,
    required: true,
    unique: true
  },

  verifyOtp: {
    type: String,
    default: ""
  },

  otpExpiry: {
    type: Date
  }

});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;