const router = require("express").Router();
const { sendOTP } = require("./controller");
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
