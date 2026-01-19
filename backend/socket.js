<<<<<<< HEAD
module.exports = (io) => {
  io.on("connection", socket => {
    socket.on("join", userId => socket.join(userId));

    socket.on("sendMessage", ({ from, to, text }) => {
      io.to(to).emit("receiveMessage", { from, text });
    });
  });
};
=======
module.exports = (io) => {
  io.on("connection", socket => {
    socket.on("join", userId => socket.join(userId));

    socket.on("sendMessage", ({ from, to, text }) => {
      io.to(to).emit("receiveMessage", { from, text });
    });
  });
};
>>>>>>> 890ccc49b51a948039ee8bdd06b2e3bfd7c1ec63
