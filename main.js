var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 768, title: 'Electron-Webview-Host-to-Guest-RPC-Sample'});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.openDevTools();
});
