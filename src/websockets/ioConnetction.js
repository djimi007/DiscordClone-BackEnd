const { Server } = require("socket.io");
const { getMessages, sendMessage } = require("../domain/message/controller");
const userSocketMap = require("./socketMap");
const handleWebRtc = require("./webrtc/webrct");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  userSocketMap[userId] = socket;

  console.log(`user connected is ${userId},`);

  handleWebRtc(socket, userSocketMap);

  socket.on("disconnect", () => {
    disconnectUser(userId);
  });
});

const disconnectUser = (userId) => {
  delete userSocketMap[userId];
};

const saveUser = (senderId, reciverId, socket) => {
  if (!userSocketMap[senderId]) {
    userSocketMap[senderId] = socket.id;
  }
  if (!userSocketMap[reciverId]) {
    userSocketMap[reciverId] = socket.id;
  }
};

module.exports = io;
