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
        message: "Mobile number required",
      });
    }

    const registerUser = await RegisterModel.findOne({ mobile });

    if (!registerUser) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }

    const email = registerUser.email;
    console.log("EMAIL:", email);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        mobile,
        verifyOtp: otp,
        otpExpiry: otpExpiry,
      });
    } else {
      user.verifyOtp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    await sendMail(
      email,
      "Purplle App Login OTP",
      `
      <div style="font-family:Arial;padding:20px;background:#f9f9f9">
        
        <div style="
          max-width:500px;
          margin:auto;
          background:white;
          padding:30px;
          border-radius:10px;
          box-shadow:0 0 10px rgba(0,0,0,0.1);
        ">
        
          <h2 style="color:#6a1b9a;text-align:center">
            Purplle App OTP Verification
          </h2>

          <p>Hello User,</p>

          <p>Your One-Time Password (OTP) is:</p>

          <div style="
            font-size:36px;
            font-weight:bold;
            text-align:center;
            color:#6a1b9a;
            letter-spacing:8px;
            margin:30px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP is valid for 
            <b>5 minutes</b>.
          </p>

          <p>
            Please do not share this OTP with anyone.
          </p>

          <hr />

          <p style="
            font-size:12px;
            color:gray;
            text-align:center;
          ">
            © Purplle App | Secure Login System
          </p>

        </div>

      </div>
      `,
    );

    console.log("MAIL SENT");

    res.json({
      success: true,
      message: "OTP Sent Successfully",
      mobile,
    });
  } catch (error) {
    console.log("Full error", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
