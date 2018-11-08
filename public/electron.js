const {app, BrowserWindow, Menu, shell} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const express = require('express');

const createServer = () => {
  const server = express();
  server.get('/', (req, res) => {
    res.send('Hello World!!!!!')
  });
  const port = 8000;
  server.listen(port, () => {
    console.log("Server is running on Port " + port)
  });
};

const isWindows = process.platform === 'win32';

const windows = [];
const name = 'Topas';

const setMainMenu = () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: isWindows ? 'Datei' : name,
        submenu: [
          {
            label: `${name} Beenden`,
            accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
            click() {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'Bearbeiten',
        submenu: [
          {role: 'undo', label: 'Widerrufen'},
          {role: 'redo', label: 'Widerholen'},
          {type: 'separator'},
          {role: 'cut', label: 'Ausschneiden'},
          {role: 'copy', label: 'Kopieren'},
          {role: 'paste', label: 'Einfügen'},
          {role: 'pasteandmatchstyle', label: 'Einfügen und Stil anpassen'},
          {role: 'delete', label: 'Löschen'},
          {role: 'selectall', label: 'Alle auswählen'}
        ]
      },
      {
        label: 'Darstellung',
        submenu: [
          {role: 'reload', label: 'Dienst neu laden'},
          {role: 'forcereload', label: 'Topas neu laden'},
          {role: 'toggledevtools', label: 'Entwicklertools anzeigen'},
          {type: 'separator'},
          {role: 'resetzoom', label: 'Originalgröße'},
          {role: 'zoomin', label: 'Vergrößern'},
          {role: 'zoomout', label: 'Verkleiner'},
          {type: 'separator'},
          {role: 'togglefullscreen', label: 'Vollbildmodus'}
        ]
      },
      {
        label: 'Fenster',
        submenu: [
          {role: 'minimize', label: 'Minimieren'},
          {role: 'close', label: 'Schließen'}
        ]
      },
      {
        label: 'Hilfe',
        submenu: [
          {
            label: 'Mehr erfahren',
            click() {
              shell.openExternal('https://electronjs.org');
            }
          }
        ]
      }
    ])
  );
};

const createWindow = browserWindowOptions => {
  const win = new BrowserWindow(
    Object.assign(
      {
        minWidth: 1060,
        minHeight: 768,
        show: false,
        backgroundColor: '#f5f5f5',
        title: name
      },
      browserWindowOptions
    )
  );
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
  });
  win.on('ready-to-show', () => {
    win.show();
  });
  setMainMenu();
  createServer();
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
