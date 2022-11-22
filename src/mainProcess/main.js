const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const measureFCPTime = require("./handlers/measureFCPTime");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 1200,
    minHeight: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  ipcMain.handle(
    "measureFCPTime",
    async (event, deviceInfo) => await measureFCPTime(deviceInfo),
  );

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
