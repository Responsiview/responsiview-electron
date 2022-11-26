const { contextBridge, ipcRenderer } = require("electron");
const remote = require("electron");

contextBridge.exposeInMainWorld("path", {
  dirname: () => __dirname,
});

contextBridge.exposeInMainWorld("api", {
  measureFCPTime: (deviceInfo) =>
    ipcRenderer.invoke("measureFCPTime", deviceInfo),
});

contextBridge.exposeInMainWorld("remote", {
  openExternalLoginPage: (url) => remote.shell.openExternal(url),
});

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    ...ipcRenderer,
    on: ipcRenderer.on.bind(ipcRenderer),
    once: ipcRenderer.once.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
  },
});
