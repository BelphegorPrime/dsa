const { GraphQLUpload } = require('graphql-upload');
const homedir = require('os').tmpdir();
const fs = require('fs');
const potrace = require('potrace');
const jsSvgPath = require('js-svg-path');
const HtmlDom = require('htmldom');

const checkDirectorySync = require('./checkDirectorySync');

const files = [];

const processUpload = upload => {
  const appDataDir = `${homedir}/topas`;
  checkDirectorySync(appDataDir);
  const uploadDir = `${appDataDir}/uploads`;
  checkDirectorySync(uploadDir);
  return upload
    .then(data => {
      const stream = data.createReadStream();
      const id = files.length;
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
      return potrace.trace(
        file.path,
        {
          alphaMax: 0
        },
        (err, svg) => {
          if (err) {
            console.error('potrace error: ', err);
            file.svgRawAddress = '';
            file.svgAddress = '';
            files.push(file);
            return file;
          }

          const svgBaseFilePath = `${uploadDir}/`;
          const svgFileName = `${file.id}-${file.filename}.svg`;
          const svgRawFileName = `${file.id}-${file.filename}_raw.svg`;
          fs.writeFile(`${svgBaseFilePath}${svgRawFileName}`, svg, writeError =>
            console.error('write error: ', writeError)
          );

          const dom = new HtmlDom(svg);
          const paths = dom.$('path');

          const outline = new jsSvgPath.Outline();
          const parser = new jsSvgPath.SVGParser(outline);
          parser.parse(paths[0].attributes.d);

          const vertices = [];
          outline.getShapes().forEach((shape, shapeIndex) => {
            const points = shape.points.map(point => point.main);

            const tuples = points.map((point, pointIndex) => {
              if (pointIndex > 0) {
                return [points[pointIndex - 1], point];
              }
              return [point, points[points.length - 1]];
            });

            const path = tuples
              .map(tuple => {
                const [from, to] = tuple;
                return `M${from.x} ${from.y} L${to.x} ${to.y} `;
              })
              .join('');

            vertices.push(
              `<path id="layer_${shapeIndex}" stroke="black" d="${path}"></path>`
            );
          });
          paths.parent().html(vertices.join('\n'));

          file.svgRawAddress = `http://localhost:7000/static/${svgRawFileName}`;
          file.svgAddress = `http://localhost:7000/static/${svgFileName}`;
          files.push(file);

          fs.writeFileSync(`${svgBaseFilePath}${svgFileName}`, dom.stringify());
          return file;
        }
      );
    });
};

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
  }
};

module.exports = resolvers;
