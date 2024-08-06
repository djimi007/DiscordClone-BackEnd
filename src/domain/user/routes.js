const express = require("express");

const { createNewUser, authenticateUser } = require("./controller");

const auth = require("../../middleware/auth");

const router = express.Router();

const { sendVerificationEmail } = require("../email_verfiication/controller");

//proctected route

router.get("/private-data", auth, (req, res) => {
  res.status(200).send(`your in the private route of  ${req.currentUser.email}`);
});

router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!(email && password)) {
      throw Error("Empty Field ");
    }

    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!(name && email && password)) {
      throw Error("Empty Field ");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid name entred");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entred");
    } else if (password.length < 8) {
      throw Error("password to short ");
    }

    const newUser = await createNewUser({
      name,
      email,
      password,
    });
    await sendVerificationEmail({ email });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
