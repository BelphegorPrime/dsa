const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    heros: [String]
    houseRules: [String]
  }
  type Mutation {
    saveHero(hero: String): String
    saveHouseRule(rule: String): String
    upsertHero(hero: String): String
    upsertHouseRule(rule: String): String
  }
`;

module.exports = typeDefs;
