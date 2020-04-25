const { BrowserWindow } = require("electron");
const path = require("path");

// Create the browser window.
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, "../preload.js"),
    nodeIntegration: true,
  },
});
// Open the DevTools.
// mainWindow.webContents.openDevTools()

// and load the index.html of the app.
mainWindow.loadFile(path.join(__dirname, "index.html"));

// exports window
module.exports = mainWindow;
