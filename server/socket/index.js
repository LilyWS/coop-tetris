const { Server } = require('socket.io');
const cors = require("cors");

const connection = (socket) => {
    console.log('got connection');
    socket.emit('connection', null);

    socket.on("test", () => {console.log("hi!")})
}

module.exports = function(server){ //initialize socket 
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    
    io.on('connection', (socket) => connection(socket));

    io.on('disconnect', () => console.log('disconnected'));
};