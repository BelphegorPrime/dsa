const childProcess = require('child_process');

const runScript = (scriptPath, port) =>
  new Promise((resolve, reject) => {
    let invoked = false;
    const process = childProcess.fork(scriptPath, [port]);
    process.on('error', err => {
      if (invoked) {
        return;
      }
      invoked = true;
      reject(err);
    });

    process.on('exit', code => {
      if (invoked) {
        return;
      }
      invoked = true;
      reject(new Error(`exit code ${code}`));
    });

    process.on('message', m => {
      resolve(m);
    });
  });

const getPath = type => {
  switch (type) {
    case 'DATA_SERVER':
      return `${__dirname}/dataServer/index.js`;
    case 'MAP_SERVER':
      return `${__dirname}/mapServer/index.js`;
    default:
      return null;
  }
};
const run = (port = 8000, type) =>
  new Promise((resolve, reject) => {
    const path = getPath(type);
    if (!path) {
      reject(new Error(`NO PATH FOR TYPE ${type} FOUND`));
    }
    runScript(path, port)
      .then(url => resolve({ url, path, type }))
      .catch(err => reject(err));
  });

const createServer = (port, type, app) => {
  run(port, type).then(serverData => {
    app.data.servers.push(serverData);
    console.warn(app.data);
  });
};
module.exports = createServer;
