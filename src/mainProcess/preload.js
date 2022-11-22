const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("path", {
  dirname: () => __dirname,
});

contextBridge.exposeInMainWorld("api", {
  measureFCPTime: (deviceInfo) =>
    ipcRenderer.invoke("measureFCPTime", deviceInfo),
});
