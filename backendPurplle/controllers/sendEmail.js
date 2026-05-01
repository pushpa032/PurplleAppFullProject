const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

transporter.verify((error) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY ");
  }
});

async function sendMail(to, subject, html, attachments) {
  try {
    await transporter.sendMail({
      from: "pushpackm09@gmail.com", 
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent");
  } catch (error) {
    console.log("Email failed:", error);
  }
}

module.exports = sendMail;