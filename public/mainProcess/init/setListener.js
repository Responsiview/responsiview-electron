const { ipcMain, session } = require("electron");

const measureFCPTime = require("../handler/measureFCPTime");

function setListener() {
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
      url: "https://responsiview.online",
      name: cookie.key,
      value: cookie.value,
    });
  });

  ipcMain.on("removeAllCookies", async () => {
    const cookies = await session.defaultSession.cookies.get({});

    cookies.forEach((cookie) =>
      session.defaultSession.cookies.remove({
        url: "https://responsiview.online",
        name: cookie.name,
      }),
    );
  });
}

module.exports = setListener;
