const { Menu, app, nativeImage, shell } = require("electron");

const path = require("path");

function setMenu() {
  const menuTemplate = [
    {
      label: "Responsiview",
      submenu: [
        {
          label: "About",
          role: "about",
        },
        {
          label: "Github",
          click() {
            shell.openExternal(
              "https://github.com/Responsiview/responsiview-electron",
            );
          },
        },
        {
          label: "Quit",
          role: "quit",
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
  app.setAboutPanelOptions({
    applicationName: "Responsiview",
    applicationVersion: "Version",
    version: "1.0.0",
    copyright: "Copyright @ 2022 Gyutae Park",
  });

  const image = nativeImage.createFromPath(
    path.join(__dirname, "../../../src/assets/images/responsiview-logo.png"),
  );

  app.dock.setIcon(image);
  app.dock.bounce();
}

module.exports = setMenu;
