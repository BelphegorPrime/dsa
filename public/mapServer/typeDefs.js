const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Query {
    books: [Book]
  }
  type Book {
    title: String
    author: String
  }
`;

module.exports = typeDefs;
