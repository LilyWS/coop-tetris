const { Score, Game } = require('../models');
const {createQueryID} = require('../utils/gameMethods')

const resolvers = {
    Query: {
        games: async () => {
            return Game.find();
        }
    },
    Mutation: {
        createMatch: async (_, args) => {
            let qID = createQueryID();
            const match = await Game.create({queryID: qID});
            match.player1 = args.user;
            await match.save();
            return match;
        }
    }
}

module.exports = resolvers;