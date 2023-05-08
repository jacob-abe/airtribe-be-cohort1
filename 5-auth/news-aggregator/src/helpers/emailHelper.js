const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS, CLIENT_URL } = require("../config");

const transporter = nodemailer.createTransport({
  service: "Gmail", // or any other email service
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, name, token) => {
  const verificationLink = `${CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
