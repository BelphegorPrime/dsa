const Loki = require('lokijs');
const LokiFSStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');
const { getDataHome } = require('platform-folders');
const checkDirectorySync = require('./checkDirectorySync');

const getDB = () => {
  const appDataDir = `${getDataHome()}/topas`;
  checkDirectorySync(appDataDir);
  return new Promise(resolve => {
    const db = new Loki(`${appDataDir}/topas.json`, {
      verbose: true,
      autosave: true,
      autosaveInterval: 4000,
      autoload: true,
      autoloadCallback: () => {
        if (!db.getCollection('heros')) {
          db.addCollection('heros');
        }
        resolve(db);
      },
      adapter: new LokiFSStructuredAdapter(),
      autosaveCallback: () => {
        console.warn('saved');
      }
    });
  });
};

module.exports = getDB;
