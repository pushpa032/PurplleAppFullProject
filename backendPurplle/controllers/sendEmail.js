const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// debug check
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

async function sendMail(to, subject, html, attachments) {
  try {
    console.log("Sending mail to:", to);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email sending failed FULL:", error);
    throw error;
  }
}

module.exports = sendMail;