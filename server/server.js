const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');

const { authMiddleware } = require('./utils/auth');
const { resolvers, typeDefs } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  context: authMiddleware,
  resolvers,
  typeDefs,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${ PORT }`);
      console.log(`Use GraphQL at http://localhost:${ PORT }${ server.graphqlPath }`);
    });
  });
}

startApolloServer().then(() => console.log('Server stopped.'));
