module.exports = function(io) {
  io.sockets.on('connection', function(socket) {
    console.log('socket is connected!!');
    socket.on('', function(data){
    //socket.emit: sending data from the server to one
    //socket.broadcast.emit: sending data to everyone but the one
    //io.sockets.emit: sending data to everyone
    });
  });
};
