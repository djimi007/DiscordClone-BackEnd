const mongoose = require("mongoose");

const serverModel = mongoose.Schema({
  name: { type: String, require: true },
  creatorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "Server",
      },
    },
  ],
});

const ServerModel = mongoose.model("Server", serverModel);

module.exports = ServerModel;
