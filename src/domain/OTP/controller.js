const OTPModel = require("./model");
const generateOTP = require("../../utils/generateOTP");
const { sendEmail } = require("../../utils/sendEmail");
const { hashData } = require("../../utils/hashData");

const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) throw Error("Provide values for email");

    await OTPModel.deleteOne({ email });
    const generatedOTP = await generateOTP();

    const mailOption = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `
      <p>${message}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p>
<p>This code will <b>expire in ${duration} hour(s)</b>.</p>`,
    };
    await sendEmail(mailOption);

    const hashedOTP = await hashData(generatedOTP);

    const newOTP = new OTPModel({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000 * +duration,
    });
    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = { sendOTP };
