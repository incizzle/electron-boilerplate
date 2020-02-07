const { format } = require('url')
const { resolve } = require('app-root-path')
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require('electron-is-dev')

let mainWindow;

function createWindow() {
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

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : format({
        pathname: resolve('app/renderer/.parcel/production/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );
  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});