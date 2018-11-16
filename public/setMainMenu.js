const packageJson = require('../package.json');
const createServer = require('./createServer');

const setMainMenu = (app, Menu, shell) => {
  const isWindows = process.platform === 'win32';
  const name = packageJson.productName;
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
          },
          {
            label: 'Starte Kartenserver',
            click() {
              createServer(7001, { type: 'MAP_SERVER' }, app);
            }
          }
        ]
      },
      {
        label: 'Bearbeiten',
        submenu: [
          { role: 'undo', label: 'Widerrufen' },
          { role: 'redo', label: 'Widerholen' },
          { type: 'separator' },
          { role: 'cut', label: 'Ausschneiden' },
          { role: 'copy', label: 'Kopieren' },
          { role: 'paste', label: 'Einfügen' },
          { role: 'pasteandmatchstyle', label: 'Einfügen und Stil anpassen' },
          { role: 'delete', label: 'Löschen' },
          { role: 'selectall', label: 'Alle auswählen' }
        ]
      },
      {
        label: 'Darstellung',
        submenu: [
          { role: 'reload', label: 'Dienst neu laden' },
          { role: 'forcereload', label: 'Topas neu laden' },
          { role: 'toggledevtools', label: 'Entwicklertools anzeigen' },
          { type: 'separator' },
          { role: 'resetzoom', label: 'Originalgröße' },
          { role: 'zoomin', label: 'Vergrößern' },
          { role: 'zoomout', label: 'Verkleiner' },
          { type: 'separator' },
          { role: 'togglefullscreen', label: 'Vollbildmodus' }
        ]
      },
      {
        label: 'Fenster',
        submenu: [
          { role: 'minimize', label: 'Minimieren' },
          { role: 'close', label: 'Schließen' }
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

module.exports = setMainMenu;
