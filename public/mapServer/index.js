const homedir = require('os').tmpdir();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const checkDirectorySync = require('../checkDirectorySync');

const appDataDir = `${homedir}/topas`;
checkDirectorySync(appDataDir);
const uploadDir = `${appDataDir}/uploads`;
checkDirectorySync(uploadDir);

const app = express();
app.use(cors());
app.use(
  graphqlUploadExpress({
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  })
);

app.use('/static', express.static(uploadDir));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  uploads: false
});
server.applyMiddleware({ app });
const port = process.argv[2];
app.listen(port, () => {
  process.send(`http://localhost:${port}/graphql`);
});
