var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 768, title: 'Electron-Webview-Host-to-Guest-RPC-Sample'});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  // mainWindow.openDevTools();
});
