import { app as ElectronApp, Menu, shell } from "electron";
import createServer, { Type } from "./createServer";
import { Data } from "./index";

const setMainMenu = (app: typeof ElectronApp & { data: Data }): void => {
  const isWindows = process.platform === "win32";
  const name = "Topas";
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: isWindows ? "Datei" : name,
        submenu: [
          {
            label: `${name} Beenden`,
            accelerator: isWindows ? "Alt+F4" : "CmdOrCtrl+Q",
            click() {
              app.quit();
            },
          },
          {
            label: "Starte Kartenserver (Port 7000)",
            click() {
              createServer(7000, { type: Type.MAP_SERVER }, app);
            },
          },
        ],
      },
      {
        label: "Bearbeiten",
        submenu: [
          { role: "undo", label: "Widerrufen" },
          { role: "redo", label: "Widerholen" },
          { type: "separator" },
          { role: "cut", label: "Ausschneiden" },
          { role: "copy", label: "Kopieren" },
          { role: "paste", label: "Einfügen" },
          { role: "pasteAndMatchStyle", label: "Einfügen und Stil anpassen" },
          { role: "delete", label: "Löschen" },
          { role: "selectAll", label: "Alle auswählen" },
        ],
      },
      {
        label: "Darstellung",
        submenu: [
          { role: "reload", label: "Dienst neu laden" },
          { role: "forceReload", label: "Topas neu laden" },
          { role: "toggleDevTools", label: "Entwicklertools anzeigen" },
          { type: "separator" },
          { role: "resetZoom", label: "Originalgröße" },
          { role: "zoomIn", label: "Vergrößern" },
          { role: "zoomOut", label: "Verkleiner" },
          { type: "separator" },
          { role: "togglefullscreen", label: "Vollbildmodus" },
        ],
      },
      {
        label: "Fenster",
        submenu: [
          { role: "minimize", label: "Minimieren" },
          { role: "close", label: "Schließen" },
        ],
      },
      {
        label: "Hilfe",
        submenu: [
          {
            label: "Mehr erfahren",
            click() {
              shell.openExternal("https://electronjs.org");
            },
          },
        ],
      },
    ])
  );
};

export default setMainMenu;
