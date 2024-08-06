const router = require("express").Router();
const { sendOTP, verifyOTP } = require("./controller");

router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOTP = await verifyOTP({ email, otp });

    res.status(200).json({ valid: validOTP });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOtp = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(200).json(createdOtp);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
