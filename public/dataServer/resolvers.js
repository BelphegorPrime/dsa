const getDB = require('../getDB');

const resolvers = {
  Query: {
    heros: () =>
      getDB().then(db =>
        db.getCollection('heros').data.map(h => JSON.stringify(h))
      )
  },
  Mutation: {
    saveHero: (_, { hero }) =>
      getDB().then(db => {
        const heros = db.getCollection('heros');
        heros.insert(JSON.parse(hero));
        const { data } = heros;
        return JSON.stringify(data[data.length - 1]);
      }),
    upsertHero: (_, { hero }) =>
      getDB().then(db => {
        const heros = db.getCollection('heros');
        const { data } = heros;
        const instance = JSON.parse(hero);
        if (instance.$loki) {
          const cached = heros.findOne({ $loki: { $eq: instance.$loki } });
          heros.update(Object.assign(cached, instance));
          return JSON.stringify(data[instance.$loki - 1]);
        }
        heros.insert(instance);
        return JSON.stringify(data[data.length - 1]);
      })
  }
};

module.exports = resolvers;
