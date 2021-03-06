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

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
    svgAddress: String!
    svgRawAddress: String!
  }
`;

module.exports = typeDefs;
