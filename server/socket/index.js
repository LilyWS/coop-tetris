const { Server } = require('socket.io');
const cors = require("cors");

var x = 50;

const connection = (socket, io) => {
    console.log('got connection');
    socket.emit('connection', null);

    socket.on("keypress", key => {
        console.log(key)
        if (key == "a") {
            x -= 5;
        }else if (key == "e") {
            x += 5;
        }
        io.emit('move', x)
    })
}

module.exports = function(server){ //initialize socket 
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    
    io.on('connection', (socket) => connection(socket, io));

    io.on('disconnect', () => console.log('disconnected'));
};