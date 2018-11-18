const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  type Query {
    uploads: [File]
  }
  type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]!
  }
  type Subscription {
      
  }
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

module.exports = typeDefs;
