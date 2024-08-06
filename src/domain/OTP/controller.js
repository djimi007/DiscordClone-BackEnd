const OTPModel = require("./model");
const generateOTP = require("../../utils/generateOTP");
const { sendEmail } = require("../../utils/sendEmail");
const { hashData, virifyHashData } = require("../../utils/hashData");

const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) throw Error("provide value for email and otp");
    const matchedOTP = await OTPModel.findOne({
      email,
    });

    if (!matchedOTP) throw Error("No OTP Found");

    const { expiredAt } = matchedOTP;

    if (expiredAt < Date.now()) {
      await OTPModel.deleteOne({ email });

      throw Error("Code has expired , Request for new one");
    }
    const validOTP = virifyHashData(otp, matchedOTP.otp);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

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

const deleteOTP = async (email) => {
  try {
    await OTPModel.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = { sendOTP, verifyOTP, deleteOTP };
