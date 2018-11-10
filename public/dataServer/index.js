const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});
server.applyMiddleware({ app });
const port = process.argv[2];
app.listen(port, () => {
  process.send(`http://localhost:${port}/graphql`);
});
