const path = require('path');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

let mainWindow = null;

if (process.platform === 'linux') {
  // Avoid VAAPI initialization failures on systems with older libva.
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('disable-gpu');
  app.commandLine.appendSwitch('use-gl', 'swiftshader');
  app.commandLine.appendSwitch('disable-features', 'VaapiVideoDecoder,VaapiVideoEncoder');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'Electron-Webview-Host-to-Guest-RPC-Sample',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();
}

ipcMain.on('show-context-menu', (event) => {
  const menu = Menu.buildFromTemplate([]);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
