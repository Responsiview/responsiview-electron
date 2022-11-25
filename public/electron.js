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
    async (_, deviceInfo) => await measureFCPTime(deviceInfo),
  );

  ipcMain.handle("getCookie", async (_, cookieKey) => {
    const cookie = await session.defaultSession.cookies.get({
      name: cookieKey,
    });

    return cookie[0].value;
  });
  ipcMain.on("setCookie", async (_, cookie) => {
    await session.defaultSession.cookies.set({
      url: "https://responsiview-firebase-login.netlify.app",
      name: cookie.key,
      value: cookie.value,
    });
  });
  ipcMain.on("removeAllCookies", async () => {
    const cookies = await session.defaultSession.cookies.get({});

    cookies.forEach((cookie) =>
      session.defaultSession.cookies.remove({
        url: "https://responsiview-firebase-login.netlify.app",
        name: cookie.name,
      }),
    );
  });

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

app.on("open-url", (_, data) => {
  mainWindow.webContents.send("login-result", data);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
