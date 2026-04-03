const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hostApi', {
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
});