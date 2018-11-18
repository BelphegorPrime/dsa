const { GraphQLUpload } = require('graphql-upload');
const { getDataHome } = require('platform-folders');
const fs = require('fs');

const checkDirectorySync = require('../checkDirectorySync');

const files = [];

const processUpload = upload =>
  upload
    .then(data => {
      const stream = data.createReadStream();
      const id = files.length;
      const appDataDir = `${getDataHome()}/topas`;
      checkDirectorySync(appDataDir);
      const uploadDir = `${appDataDir}/uploads`;
      checkDirectorySync(uploadDir);
      const path = `${uploadDir}/${id}-${data.filename}`;
      return new Promise((resolve, reject) =>
        stream
          .on('error', error => {
            if (stream.truncated) {
              fs.unlinkSync(path);
            }
            reject(error);
          })
          .pipe(fs.createWriteStream(path))
          .on('error', error => reject(error))
          .on('finish', () => resolve(Object.assign(data, { id, path })))
      );
    })
    .then(file => {
      files.push(file);
      return file;
    });

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    uploads: () => files
  },
  Mutation: {
    singleUpload(parent, { file }) {
      return processUpload(file);
    },
    multipleUpload(obj, { files: data }) {
      return Promise.all(data.map(processUpload)).then(() => files);
    }
  },
  Subscription: {}
};

module.exports = resolvers;
