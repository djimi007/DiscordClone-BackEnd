const User = require("../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("../OTP/controller");
const { hashData } = require("../../utils/hashData");

const verifyForgetPasswordOTP = async ({ email, otp, newPassword }) => {
  try {
    const verfyOtp = await verifyOTP({ email, otp });
    if (!verfyOtp) throw Error("check your email again and make sure the number is correct");
    if (newPassword.length < 8) throw Error("password to short");

    const hashedNewPassword = await hashData(newPassword);

    const user = await User.updateOne({ email }, { password: hashedNewPassword });

    await deleteOTP(email);
    return user;
  } catch (error) {
    throw error;
  }
};

const sendForgetPasswordOTP = async (email) => {
  try {
    if (!email) throw Error("email required");
    const existUser = await User.findOne({ email });
    if (!existUser) throw Error("user don't exist");

    if (!existUser.verified) {
      throw Error("you need to verify your account check inbox");
    }

    const forgetPasswordOtpDetails = {
      email,
      subject: "Password Reset",
      message: "Reset your password with code below.",
      duraton: 1,
    };

    const createdOtp = await sendOTP(forgetPasswordOtpDetails);
    return createdOtp;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendForgetPasswordOTP, verifyForgetPasswordOTP };
