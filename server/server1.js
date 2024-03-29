const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const { authMiddleware } = require('./utils/auth');
//https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
const session = require('express-session');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

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

var sessionMiddleware = session({ //shared session for socket. not using jwt.
  secret: process.env.SECRET || 'test secret',
  resave: true,
  saveUninitialized: true
});

const httpServer = require('http').createServer(app);

require("./socket")(httpServer, sessionMiddleware)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});