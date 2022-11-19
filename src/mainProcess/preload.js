const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("path", {
  dirname: () => __dirname,
});
