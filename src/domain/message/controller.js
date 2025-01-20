const MessageModel = require("./model");
const User = require("../user/model");

const sendMessage = async ({ roomID, message }, io) => {
  try {
    // Create and save the message
    const newMessage = new MessageModel({
      message,
      roomID,
    });
    await newMessage.save();

    // Emit the message to the room
    io.to(roomID).emit("receiveMessage", newMessage);

    return newMessage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMessages = async ({ roomID }, socket) => {
  try {
    const messages = await MessageModel.find({ roomID }).populate(
      "senderId receiverId"
    );

    // Send all messages to the socket
    socket.emit("All-Messages", messages);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendMessage, getMessages };
