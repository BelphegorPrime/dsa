const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');

const files = [];

const storeFS = ({ stream, filename }) => {
  const id = files.length;
  const path = `${__dirname}/uploads/${id}-${filename}`;
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
      .on('finish', () => resolve({ id, path }))
  );
};

const processUpload = upload =>
  upload.then(({ filename, mimetype, encoding, createReadStream }) =>
    storeFS({ stream: createReadStream(), filename }).then(({ id, path }) => {
      const file = { id, filename, mimetype, path, encoding };
      files.push(file);
      return file;
    })
  );

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    uploads: () => files,
    hello: () => 'Hello World'
  },
  Mutation: {
    singleUpload(parent, { file }) {
      return processUpload(file);
    },
    multipleUpload(obj, { files: data }) {
      return Promise.all(data.map(processUpload)).then(() => files);
    }
  }
};

module.exports = resolvers;
