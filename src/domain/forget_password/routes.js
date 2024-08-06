const express = require("express");

const router = express.Router();

const { sendForgetPasswordOTP, verifyForgetPasswordOTP } = require("./controller");

router.post("/reset", async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) throw Error("email and otp are required");

    await verifyForgetPasswordOTP({ email, otp, newPassword });

    res.status(200).json({ email, passwordReset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let { email } = req.body;
    const result = await sendForgetPasswordOTP(email);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
