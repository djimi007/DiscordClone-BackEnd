const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) console.log(error);
  else {
    console.log("Ready For Message");
    console.log(success);
  }
});

const sendEmail = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
