const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID
        score: Int
        player1Queue: [String]
        player2Queue: [String]
        board: String        
    }

    type Query {
        games: [Game]
    }
`;

module.exports = typeDefs;