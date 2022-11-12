const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
    formatError: (err) => {
        console.log(err);
        return err;
    }
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

require("./socket")(httpServer);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    httpServer.listen(PORT, () => {
        console.log("Server Time")
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
});