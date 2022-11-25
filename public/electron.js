const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  session,
} = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const measureFCPTime = require("./handlers/measureFCPTime");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 1000,
    minHeight: 750,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
    },
  });

  ipcMain.handle(
    "measureFCPTime",
    async (event, deviceInfo) => await measureFCPTime(deviceInfo),
  );
  ipcMain.on("setCookie", (event, cookie) =>
    session.defaultSession.cookies.set({
      url: "url",
      name: cookie.key,
      value: cookie.value,
    }),
  );

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const image = nativeImage.createFromPath(
    path.join(__dirname, "../src/assets/images/responsiview-logo.png"),
  );

  app.dock.setIcon(image);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.setAsDefaultProtocolClient("responsiview");

app.on("open-url", (event, data) => {
  mainWindow.webContents.send("login-result", data);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
