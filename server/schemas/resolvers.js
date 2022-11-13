const { Score, Game } = require('../models');

const resolvers = {
    Query: {
        games: async () => {
            return Game.find();
        }
    },
    Mutation: {
        createMatch: async (_, args) => {
            const match = await Game.create({queryID: "hi!!!"});
            match.player1 = args.user;
            await match.save();
            return match;
        }
    }
}

module.exports = resolvers;