const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const { app, BrowserWindow } = electron;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ fullscreen: true, fullscreenable: true });
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(
    isDev ? startUrl : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.maximize();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

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
