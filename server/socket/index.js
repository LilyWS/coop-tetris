const { Server } = require('socket.io');
const cors = require("cors");
const { Score, Game } = require('../models');

var matches = [] //will store matchesas we work with them
var x = 50;

const matchJoin = async (data, socket) => {

}

const connection = async (socket, io) => {
    console.log('got connection');
    var game = await Game.findOne({ score: 20 }, (err, obj) => {
        return obj;
    })
    console.log("real!!", game)

    socket.emit('connection', null);

    socket.on("matchJoin", async (data) => matchJoin(data, socket));

    socket.on("keypress", key => {
        console.log(key)
        if (key == "a") {
            game.score -= 5;
        }else if (key == "e") {
            game.score += 5;
        }
        io.emit('move', game.score)
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