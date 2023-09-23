const socketIo = require('socket.io');

function initializeSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
    },
  });

  return io;
}

module.exports = initializeSocket;
