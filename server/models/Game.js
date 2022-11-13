const { Schema, model } = require('mongoose');

const gameSchema = new Schema ({
    queryID: {
        type: String
    },
    score: {
        type: Number
    },
    player1: {
        type: String
    },
    player1Queue: [{
        type: String
    }],
    player2Queue: [{
        type: String
    }],
    player2: {
        type: String
    },
    board: {
        type: String
    }
});

const Game = model('game', gameSchema);

module.exports = Game;