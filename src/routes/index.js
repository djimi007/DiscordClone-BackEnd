const express = require("express");

const router = express.Router();

const userRoutes = require("../domain/user/routes");
const otpRoutes = require("../domain/OTP/index");
const forgetPasswordRoutes = require("../domain/forget_password/routes");
const emailVerificationRoutes = require("../domain/email_verfiication/routes");
const serverRoutes = require("../domain/server/routes");
const messageRoutes = require("../domain/message/routes");

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);
router.use("/email-valid", emailVerificationRoutes);
router.use("/forget-password", forgetPasswordRoutes);
router.use("/message", messageRoutes);
router.use("/server", serverRoutes);

module.exports = router;
