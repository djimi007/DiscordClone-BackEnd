const express = require("express");

const router = express.Router();

const userRoutes = require("../domain/user/routes");
const otpRoutes = require("../domain/OTP/index");

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);
module.exports = router;
