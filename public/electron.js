const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const setListener = require("./mainProcess/init/setListener");
const setMenu = require("./mainProcess/init/setMenu");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 1000,
    minHeight: 750,
    webPreferences: {
      preload: path.join(__dirname, "mainProcess", "preloads", "/preload.js"),
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
    },
  });

  setListener();
  setMenu();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  app.on("ready", createWindow);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("open-url", (_, data) => {
    mainWindow.webContents.send("login-result", data);
  });
});

app.setAsDefaultProtocolClient("responsiview");

app.on("window-all-closed", () => {
  app.quit();
});
