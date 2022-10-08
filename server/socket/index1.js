const socket = require('socket.io');
const sharedsession = require("express-socket.io-session");

const connection = (socket) => {
    console.log('got connection');
    socket.emit('connection', null);
}

module.exports = function(server, session){ //initialize socket 
    io = socket(server);
    console.log("hello");
    io.use(sharedsession(session, {
        autoSave: true
    }));
    
    io.on('connection', (socket) => connection(socket));

    io.on('disconnect', () => console.log('disconnected'));
};