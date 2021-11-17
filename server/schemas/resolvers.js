const { Score, Game } = require('../models');

const resolvers = {
    Query: {
        games: async () => {
            return Game.find();
        }
    }
}

module.exports = resolvers;