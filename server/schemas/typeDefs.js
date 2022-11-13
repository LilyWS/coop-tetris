const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID
        queryID: String
        score: Int
        player1: String
        player1Queue: [String]
        player2: String
        player2Queue: [String]
        board: String        
    }

    type Query {
        games: [Game]
    }

    type Mutation {
        createMatch(user:String!): Game
    }
`;

module.exports = typeDefs;