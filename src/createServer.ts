import { app as ElectronApp } from "electron";
import childProcess, { ChildProcess, ForkOptions } from "child_process";
import { Data } from "./index";

export enum Type {
  "MAP_SERVER" = "MAP_SERVER",
}

const runScript = (
  scriptPath: string,
  port: number
): Promise<{
  url: string;
  process: ChildProcess;
}> =>
  new Promise((resolve, reject) => {
    let invoked = false;
    const process = childProcess.fork(scriptPath, [port] as ForkOptions);
    process.on("error", (err) => {
      if (invoked) {
        return;
      }
      invoked = true;
      reject(err);
    });

    process.on("exit", (code) => {
      if (invoked) {
        return;
      }
      invoked = true;
      reject(new Error(`exit code ${code}`));
    });

    process.on("message", (m) => {
      resolve({
        url: m.toString(),
        process,
      });
    });
  });

const getPath = (type: Type) => {
  console.log(__dirname);
  switch (type) {
    case "MAP_SERVER":
      return `${__dirname}/mapServer/index.js`;
    default:
      return null;
  }
};
const run = (port = 8000, data: { type: Type }) =>
  new Promise((resolve, reject) => {
    const { type } = data;
    const path = getPath(type);
    if (!path) {
      reject(new Error(`NO PATH FOR TYPE ${type} FOUND`));
      return;
    }
    runScript(path, port)
      .then(({ url, process }) => resolve({ url, process, path, data }))
      .catch((err) => reject(err));
  });

const createServer = (
  port: number,
  data: { type: Type },
  app: typeof ElectronApp & { data: Data }
): void => {
  run(port, data).then((serverData) => {
    app.data.servers.push(serverData);
    console.warn(app.data);
  });
};

export default createServer;
