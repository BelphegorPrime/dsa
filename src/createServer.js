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
      resolve({
        url: m,
        process
      });
    });
  });

const getPath = type => {
  switch (type) {
    case 'MAP_SERVER':
      return `${__dirname}/mapServer/index.js`;
    default:
      return null;
  }
};
const run = (port = 8000, data) =>
  new Promise((resolve, reject) => {
    const { type } = data;
    const path = getPath(type);
    if (!path) {
      reject(new Error(`NO PATH FOR TYPE ${type} FOUND`));
    }
    runScript(path, port)
      .then(({ url, process }) => resolve({ url, process, path, data }))
      .catch(err => reject(err));
  });

const createServer = (port, data, app) => {
  run(port, data).then(serverData => {
    app.data.servers.push(serverData);
    console.warn(app.data);
  });
};
module.exports = createServer;
