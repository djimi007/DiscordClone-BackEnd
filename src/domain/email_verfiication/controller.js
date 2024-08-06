const User = require("../user/model");

const { sendOTP, verifyOTP, deleteOTP } = require("../OTP/controller");

const verfiryUserEmail = async ({ email, otp }) => {
  try {
    const verifiedEmail = await verifyOTP({ email, otp });
    if (!verifiedEmail) {
      throw Error("invalide code check your email again");
    }
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async ({ email }) => {
  try {
    const exitingUser = await User.findOne({ email });

    if (!exitingUser) throw Error("User don't exist");

    const OTPDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with code below.",
      duration: 1,
    };

    const createdOTP = sendOTP(OTPDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendVerificationEmail, verfiryUserEmail };
