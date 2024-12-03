const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
  content: { type: String, require: true },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  reciver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const MessageModel = mongoose.model("Message", messageModel);

module.exports = MessageModel;
