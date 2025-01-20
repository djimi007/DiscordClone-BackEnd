const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) console.log(error);
});

const sendEmail = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
