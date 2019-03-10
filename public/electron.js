const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const packageJson = require('../package.json');
const setMainMenu = require('./setMainMenu');

const data = {
  windows: [],
  servers: []
};
app.data = data;

app.on('widevine-ready', (version, lastVersion) => {
  if (lastVersion !== null) {
    console.log(
      `Widevine ${version}, upgraded from ${lastVersion}, is ready to be used!`
    );
  } else {
    console.log(`Widevine ${version} is ready to be used!`);
  }
});
app.on('widevine-update-pending', (currentVersion, pendingVersion) => {
  console.log(
    `Widevine ${currentVersion} is ready to be upgraded to ${pendingVersion}!`
  );
});
app.on('widevine-error', error => {
  console.log(`Widevine installation encounterted an error: ${error}`);
  process.exit(1);
});

const createWindow = () => {
  const { windows, servers } = app.data;
  const win = new BrowserWindow({
    minWidth: 1060,
    minHeight: 768,
    show: false,
    backgroundColor: '#f5f5f5',
    title: packageJson.productName,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      plugins: true
    }
  });
  windows.push(win);
  win.loadURL(
    isDev
      ? `http://localhost:${process.env.PORT}`
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    win.webContents.openDevTools();
  }
  win.on('closed', () => {
    windows.splice(windows.indexOf(win), 1);
    servers.map(server => server.process.kill('SIGKILL'));
  });
  win.on('ready-to-show', () => {
    win.show();
  });
  setMainMenu(app, Menu, shell);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (app.data.windows.length === 0) {
    createWindow();
  }
});
