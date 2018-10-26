const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const { app, BrowserWindow } = electron;
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });
  mainWindow.loadURL(
    isDev
      ? `http://localhost:${process.env.PORT}`
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  // mainWindow.maximize();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
