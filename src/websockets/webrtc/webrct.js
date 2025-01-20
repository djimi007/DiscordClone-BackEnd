const handleWebRtc = (socket, userSocketMap) => {
  socket.on("broadcaster", ({ senderId, receiverId }) => {
    console.log(`Broadcaster ${senderId} trying to connect with ${receiverId}`);
    const receiverSocket = userSocketMap[receiverId];
    if (receiverSocket) {
      // Emit to specific socket
      receiverSocket.emit("broadcasterJoined", {
        senderId: senderId,
        socketId: socket.id,
      });
    } else {
      console.log(`Receiver ${receiverId} not found`);
    }
  });

  socket.on("watcher", ({ senderId, receiverId }) => {
    console.log(`Watcher ${senderId} trying to connect with ${receiverId}`);
    const senderSocket = userSocketMap[receiverId];
    if (senderSocket) {
      // Emit to specific socket
      senderSocket.emit("watcherJoined", {
        watcherId: senderId,
        socketId: socket.id,
      });
    } else {
      console.log(`Sender ${receiverId} not found`);
    }
  });

  socket.on("offer", ({ peerId, offer }) => {
    console.log(`Offer received from ${socket.id} to ${peerId}`);
    const peerSocket = userSocketMap[peerId];
    if (peerSocket) {
      peerSocket.emit("offer", {
        peerId: socket.handshake.query.userId,
        socketId: socket.id,
        offer,
      });
    }
  });

  socket.on("answer", ({ peerId, answer }) => {
    console.log(`Answer received from ${socket.id} to ${peerId}`);
    const peerSocket = userSocketMap[peerId];
    if (peerSocket) {
      peerSocket.emit("answer", {
        peerId: socket.handshake.query.userId,
        socketId: socket.id,
        answer,
      });
    }
  });

  socket.on("candidate", ({ peerId, candidate }) => {
    console.log(`ICE candidate received from ${socket.id} to ${peerId}`);
    const peerSocket = userSocketMap[peerId];
    if (peerSocket) {
      peerSocket.emit("candidate", {
        peerId: socket.handshake.query.userId,
        socketId: socket.id,
        candidate,
      });
    }
  });

  socket.on("disconnectPeer", ({ peerId }) => {
    console.log(`Disconnect request from ${socket.id} to ${peerId}`);
    const peerSocket = userSocketMap[peerId];
    if (peerSocket) {
      peerSocket.emit("disconnectPeer", {
        peerId: socket.handshake.query.userId,
      });
    }
  });
};
module.exports = handleWebRtc;
