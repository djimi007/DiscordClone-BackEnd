const User = require("../user/model");
const MessageModel = require("./model");

const userSocketMap = require("../../utils/websockets/socketMap");

const io = require("../../utils/websockets/wsServer");

const sendMessage = async ({ senderId, reciverId, content }) => {
  try {
    const reciver = await User.findById(reciverId);

    if (!reciver) throw Error("reciver dont exist");

    const message = new MessageModel({ content, senderId, reciverId });
    reciver.messages.push(message);
    const updatedValue = await reciver.save();

    const receiverSocketId = userSocketMap[reciverId];

    if (receiverSocketId) {
      console.log("emitting recieveMessage event to the reciver", reciverId);
      io.to(receiverSocketId).emit("newMessage", message);
    } else {
      console.log("Receiver socket ID not found");
    }

    return updatedValue;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMessage;
