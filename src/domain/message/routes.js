const sendMessage = require("./controller");

const router = require("express").Router();

router.post("/send", async (req, res) => {
  let { senderId, reciverId, content } = req.query;

  if (!(senderId && reciverId && content))
    throw Error("senderId , reciverId and content are required");

  try {
    const sendMessagie = await sendMessage({ senderId, reciverId, content });
    res.status(200).json(sendMessagie);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
