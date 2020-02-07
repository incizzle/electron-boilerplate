import { BrowserWindow, app, ipcMain } from "electron";

const { format } = require('url')
const { resolve } = require('app-root-path')
const isDev = require('electron-is-dev')
const devtron = require('devtron')

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
        pathname: resolve('app/renderer/.parcel/production/index.html'),
        protocol: 'file:',
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
});