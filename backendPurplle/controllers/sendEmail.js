const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: (process.env.EMAIL_USER),
    pass: (process.env.EMAIL_PASS)
  },
});

async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: (process.env.EMAIL_USER),
      to,
      subject,
      html,
});
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.log("Email sending failed:", error);
    throw error;
  }
}

module.exports = sendMail;