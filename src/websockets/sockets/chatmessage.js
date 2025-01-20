const handleMessage = (socket) => {
  socket.on("sendMessage", async (arg) => {
    const { senderId, reciverId, message } = arg;

    try {
      const result = await sendMessage({ senderId, reciverId, message }, io);
      console.log(result);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
};

module.exports = handleMessage;
