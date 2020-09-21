import fs from "fs";

const checkDirectorySync = (directory: string) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

export default checkDirectorySync;
