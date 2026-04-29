const User = require("../models/users");
const crypto = require("crypto");
const sendMail = require("./sendEmail");
const RegisterModel = require("../models/register");

const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

exports.sendOtp = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const mobile = req.body?.mobile;
    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required"
      });
    }

    //MAIL GO TO USER
    const registerUser = await RegisterModel.findOne({ mobile });
    if (!registerUser) {
      return res.status(404).json({
        success: false,
        message: "User not registered"
      });
    }

    const email = registerUser.email;

    /*if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required"
      });
    }*/

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ mobile });
    console.log("User Found:", user);

    if (!user) {
      console.log("Creating new user");
      user = await User.create({
        mobile,
        verifyOtp: otp,
        otpExpiry: otpExpiry
      });
      console.log("New User Created:", user);
    } else {
      console.log("Updating existing user");
      user.verifyOtp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      console.log("User After Update:", user);
    }
    try {
      /*await sendMail(
        "deepikackm09@gmail.com",
        "Purplle App Login OTP",
        `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
      );*/
      res.json({ success: true, message: "OTP Sent Successfully", mobile });

      sendMail(
        email,
        "Purplle App Login OTP",
        `<h2>Your OTP is : ${otp}</h2><Valid for 5 minutes</p>`
      ).catch((error) => {
        console.log("ERROR:", error.message);
      });

  } catch(error){
    console.log("Full error", error);
    res.status(500).json({
      success: false,
      message: error.message
    });


  }
};