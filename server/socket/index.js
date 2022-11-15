const { Server } = require('socket.io');
const cors = require("cors");
const { Score, Game } = require('../models');

var matches = [] //will store matchesas we work with them
var x = 50;

var io;
const matchJoin = async (data, socket) => {
    //does the match exist
    var game = await Game.findOne({ queryID: data }, (err, obj) => {
        return obj;
    })
    console.log(game)
    if (!matches[data]) { //are they the first player to join? if so, the match will not exist yet in our match array and they will be player1
        matches[data] = {
            p1: {
                sid: socket.id, //keep track of each players socket ids
                queue: null //array of their next pieces
            },
            p2: {
                sid: null,
                queue: null
            },
            board: { //for now we only keep track of placed objects. will eventually need multiple boards to keep trak of falling pieces as well 
                placed: Array(22).fill().map(() => Array(12).fill(0))
            }
        }
        socket.join(data);
    } else if (!matches[data].p2.sid && socket.id != matches[data].p1.sid) { //check if theyre the second player to join the match
        matches[data].p2.sid = socket.id
        socket.join(data);
        console.log("wow!")
    } 
    io.to
}

const connection = async (socket, io) => {
    console.log('got connection');

    socket.emit('connection', null);

    socket.on("matchJoin", async (data) => matchJoin(data, socket));

    // socket.on("keypress", key => {
    //     io.emit('move', game.score)
    // })
}


module.exports = function(server){ //initialize socket 
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    
    io.on('connection', (socket) => connection(socket, io));

    io.on('disconnect', () => console.log('disconnected'));
};