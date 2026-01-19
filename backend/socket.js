module.exports = (io) => {
  io.on("connection", socket => {
    socket.on("join", userId => socket.join(userId));

    socket.on("sendMessage", ({ from, to, text }) => {
      io.to(to).emit("receiveMessage", { from, text });
    });
  });
};
