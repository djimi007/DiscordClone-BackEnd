const express = require("express");
const { createServer, getAllServers } = require("./controller");
const User = require("../user/model");

const router = express.Router();

router.get("/server", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await User.findOne({ token });
  const servers = await getAllServers({ userId: user._id });
  res.status(200).json(servers);
});

router.post("/create-server", async (req, res) => {
  const { name, creatorId } = req.body;

  if (!(name && creatorId)) throw Error("name and creator are required");
  try {
    const createdServer = await createServer({ name, creatorId });

    res.status(200).json(createdServer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
