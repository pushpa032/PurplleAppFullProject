const nodemailer = require('nodemailer');


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: (process.env.EMAIL_USER),
    pass: (process.env.EMAIL_PASS)
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

async function sendMail(to, subject, html,  attachments) {
  try {
    await transporter.sendMail({
      from: (process.env.EMAIL_USER),
      to,
      subject,
      html,
      attachments,
});
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.log("Email sending failed:", error);
    throw error;
  }
}

module.exports = sendMail;