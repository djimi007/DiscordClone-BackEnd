const express = require("express");

const router = express.Router();
const { sendVerificationEmail, verfiryUserEmail } = require("./controller");

router.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;
    await verfiryUserEmail({ email, otp });
    res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw Error("Email is required");

    const createdemailVerification = await sendVerificationEmail({ email });

    res.status(200).json(createdemailVerification);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
