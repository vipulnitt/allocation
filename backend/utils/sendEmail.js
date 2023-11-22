const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Replace the following placeholders with your own SMTP server credentials
  const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST, // Replace with your SMTP server address
    port: process.env.SMTP_PORT, // Replace with your SMTP server port
    secure: true, // Set to true if using a secure connection (e.g., TLS)
    auth: {
      user: process.env.SMTP_USERNAME, // Replace with your SMTP username
      pass: process.env.SMTP_PASSWORD, // Replace with your SMTP password
    },
  });

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    cc: ["quarters@nitt.edu"],
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
