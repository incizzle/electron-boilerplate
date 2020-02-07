import { BrowserWindow, app, ipcMain } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { format } from "url"
import { resolve } from "app-root-path"
import Datastore from "nedb-promises"

const isDev = require("electron-is-dev")
const devtron = require("devtron")
const datastore = (fileName: string) => Datastore.create({
  filename: `${app.getPath('userData')}/data/${fileName}`,
  autoload: true
})
const db = {
  logs: datastore('logs.db')
};

let mainWindow: BrowserWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 725,
    minWidth: 1350,
    minHeight: 725,
    transparent: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools()
    devtron.install()
  } else {
    mainWindow.loadURL(
      format({
        pathname: resolve("app/renderer/.parcel/production/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log("An error occurred: ", err));
});