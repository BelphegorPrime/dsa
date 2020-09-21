import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs";
// @ts-ignore
import potrace from "potrace";
// @ts-ignore
import jsSvgPath from "js-svg-path";
// @ts-ignore
import HtmlDom from "htmldom";
import jimp from "jimp";

const checkDirectorySync = (directory: string) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

const homedir = __dirname;
console.log(homedir);

const appDataDir = `${homedir}/topas`;
checkDirectorySync(appDataDir);
const uploadDir = `${appDataDir}/uploads`;
checkDirectorySync(uploadDir);

const app = express();
app.use(cors());

app.use("/static", express.static(uploadDir));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: uploadDir,
  })
);

const files: File[] = [];

const processUpload = (upload: fileUpload.UploadedFile) => {
  return new Promise(async (resolve) => {
    const id = files.length;
    const path = `${uploadDir}/${id}-${upload.name}`;
    await upload.mv(path);
    resolve({ ...upload, id, path });
  }).then((file: any) => {
    const trace = new potrace.Potrace();
    trace.setParameters({
      alphaMax: 0,
    });

    console.log(file);
    console.log(trace);

    const svgBaseFilePath = `${uploadDir}/`;
    const svgFileName = `${file.id}-${file.name}.svg`;
    const svgRawFileName = `${file.id}-${file.name}_raw.svg`;

    return new Promise(async (resolve) => {
      const image = await jimp.read(file.path);
      trace.loadImage(image, (err: Error) => {
        if (err) {
          throw err;
        }
        const svg = trace.getSVG(); // returns SVG document contents
        resolve(svg);
      });
    }).then((svg: any) => {
      console.log(svg);
      fs.writeFile(`${svgBaseFilePath}${svgRawFileName}`, svg, console.error);

      const dom = new HtmlDom(svg);
      const paths = dom.$("path");

      const outline = new jsSvgPath.Outline();
      const parser = new jsSvgPath.SVGParser(outline);
      parser.parse(paths[0].attributes.d);

      const vertices: string[] = [];
      outline.getShapes().forEach((shape: any, shapeIndex: number) => {
        const points = shape.points.map((point: any) => point.main);

        const tuples = points.map((point: any, pointIndex: number) => {
          if (pointIndex > 0) {
            return [points[pointIndex - 1], point];
          }
          return [point, points[points.length - 1]];
        });

        const path = tuples
          .map((tuple: [any, any]) => {
            const [from, to] = tuple;
            return `M${from.x} ${from.y} L${to.x} ${to.y} `;
          })
          .join("");

        vertices.push(
          `<path id="layer_${shapeIndex}" stroke="black" d="${path}"></path>`
        );
      });
      paths.parent().html(vertices.join("\n"));

      file.svgRawAddress = `http://localhost:7000/static/${svgRawFileName}`;
      file.svgAddress = `http://localhost:7000/static/${svgFileName}`;
      files.push(file);

      fs.writeFileSync(`${svgBaseFilePath}${svgFileName}`, dom.stringify());

      return file;
    });
  });
};

app.get("/uploads", (req, res) => {
  res.send(files);
});

const uploadFunc = async (req: Request, res: Response) => {
  if (req.files) {
    await Promise.all(Object.values(req.files).map(processUpload));
  }
  res.send(files);
};

app.post("/singleUpload", uploadFunc);
app.post("/multipleUpload", uploadFunc);

const port = process.argv[2];

app.listen({ port }, () => {
  if (process.send) {
    process.send(`http://localhost:${port}/graphql`);
  }
});
