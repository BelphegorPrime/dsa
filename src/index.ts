import { app as ElectronApp, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import fs from "fs";
import setMainMenu from "./setMainMenu";

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

export type Data = {
  windows: BrowserWindow[];
  servers: any[];
};

const tempDirectory = ElectronApp.getAppPath();

const createWindow = (app: typeof ElectronApp & { data: Data }) => {
  console.log("creating window");
  const { windows, servers } = app.data;
  const win = new BrowserWindow({
    minWidth: 1060,
    minHeight: 768,
    backgroundColor: "#f5f5f5",
    title: "Topas",
    // show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      plugins: true,
    },
  });
  windows.push(win);
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    win.webContents.openDevTools();
  }
  win.on("closed", () => {
    console.log("closed");
    windows.splice(windows.indexOf(win), 1);
    servers.map((server) => server.process.kill("SIGKILL"));
  });
  // win.on("ready-to-show", () => {
  //   win.show();
  // });

  console.log("created window");
};

const main = async () => {
  console.log("startup");
  const initialData: Data = {
    windows: [],
    servers: [],
  };

  const app = ElectronApp as typeof ElectronApp & { data: Data };
  app.data = initialData;
  setMainMenu(app);

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => createWindow(app));

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(app);
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.

  const isJSON = (jsonString: string): any | null => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const checkDirectorySync = (directory: string) => {
    try {
      fs.statSync(directory);
    } catch (e) {
      fs.mkdirSync(directory);
    }
  };

  const getFile = (fileName: string) => {
    const appDataDir = `${tempDirectory}/topas`;
    checkDirectorySync(appDataDir);
    const filePath = `${appDataDir}/${fileName}.json`;
    if (fs.existsSync(filePath)) {
      const dataString = fs.readFileSync(filePath, "utf-8");
      return isJSON(dataString) ? JSON.parse(dataString) : null;
    }
    return null;
  };

  const saveFile = (fileName: string, data: any) => {
    const appDataDir = `${tempDirectory}/topas`;
    checkDirectorySync(appDataDir);
    const filePath = `${appDataDir}/${fileName}.json`;
    if (typeof data === "object" || Array.isArray(data)) {
      fs.writeFileSync(filePath, JSON.stringify(data));
    }
  };

  ipcMain.on("synchronous-message", (event, arg) => {
    const clientData = JSON.parse(arg);
    switch (clientData.type) {
      case "getFile": {
        event.returnValue = getFile(clientData.data.fileName);
        break;
      }
      case "saveFile": {
        event.returnValue = saveFile(
          clientData.data.fileName,
          clientData.data.data
        );
        break;
      }
      default: {
        console.log(clientData);
        break;
      }
    }
  });
};

try {
  main().catch(console.error);
} catch (e) {
  console.error(e);
}
