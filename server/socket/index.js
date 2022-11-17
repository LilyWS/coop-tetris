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
            qID: data,
            p1: {
                sid: socket.id, //keep track of each players socket ids
                queue: null, //array of their next pieces
                ready: false
            },
            p2: {
                sid: null,
                queue: null,
                ready: false
            },
            board: { //for now we only keep track of placed objects. will eventually need multiple boards to keep trak of falling pieces as well 
                placed: Array(22).fill().map(() => Array(12).fill(1))
            }
        }
        socket.join(data);
    } else if (!matches[data].p2.sid && socket.id != matches[data].p1.sid) { //check if theyre the second player to join the match
        matches[data].p2.sid = socket.id
        socket.join(data);
        console.log("wow!")
        io.to(matches[data].qID).emit("readyCheck");
    } 
}

const playerReady = (queryID, socket) => {
    console.log('recieved')
    if (matches[queryID]) {
        let currentMatch = matches[queryID];
        let { p1, p2 } = currentMatch;
        p1.ready = (socket.id == p1.sid) ? true : p1.ready;
        p2.ready = (socket.id == p2.sid) ? true : p2.ready;
        console.log('mega recieved\n' + p1.ready + p2.ready);
        if (p1.ready && p2.ready) {
            p1.ready = false; //setting these values to false to use them later as a ready for rematch indicator
            p2.ready = false; 
            startMatch(queryID);
        }
    }
}

const startMatch = (queryID) => {
    console.log("started");
}


const updateAll = () => {
    for (i in matches){
        let match = matches[i];
        io.to(match.qID).emit("render", match.board);
    }
}

const connection = async (socket, io) => {
    console.log('got connection');
    
    //socket.emit('connection', null);
    
    socket.on("matchJoin", async (data) => matchJoin(data, socket));
    
    socket.on("ready", async (data) => playerReady(data, socket));
    // socket.on("keypress", key => {
    //     io.emit('move', game.score)
    // })
}

//USE SET INTERVAL TO UPDATE ALL MATCHES, FUNCTION GAME UPDATE SHOULD TAKE ARGUMENT FOR ONE GAME OR ALL OF THEM?
setInterval(updateAll, 500);

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