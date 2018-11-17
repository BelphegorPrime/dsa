const fs = require('fs');

const checkDirectorySync = directory => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

module.exports = checkDirectorySync;
