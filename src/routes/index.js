const express = require("express");

const router = express.Router();

const userRoutes = require("../domain/user/routes");
const otpRoutes = require("../domain/OTP/index");

const emailVerificationRoutes = require("../domain/email_verfiication/routes");

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);
router.use("/email-valid", emailVerificationRoutes);

module.exports = router;
