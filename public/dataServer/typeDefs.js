const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    heros: [String]
  }
  type Mutation {
    saveHero(hero: String): String
    upsertHero(hero: String): String
  }
`;

module.exports = typeDefs;
