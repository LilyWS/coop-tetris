const { Schema, model } = require('mongoose');

const scoreSchema = new Schema ({
    score: {
        type: Number
    },
    player1: {
        type: String
    },
    player2: {
        type: String
    }
});

const Score = model('score', scoreSchema);

module.exports = Score;