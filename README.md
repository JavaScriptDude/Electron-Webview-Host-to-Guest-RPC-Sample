# Electron Webview Host to Guest RPC Sample

This sample demonstrates a simple host-to-guest RPC style flow in Electron:

- Host app UI runs in the renderer process.
- A remote YouTube page is loaded in a `<webview>`.
- Guest-side helper functions are injected through the webview preload script (`inject.js`).
- Host calls guest helpers via `webview.executeJavaScript(...)`.

## Updated for modern Electron

This project now targets the latest Electron from npm and removes deprecated `remote` usage.

- Electron version: `^41.1.1`
- Host renderer integration: preload bridge (`preload.js`) + `ipcMain`/`ipcRenderer`
- Browser window security defaults used in this sample:
	- `contextIsolation: true`
	- `nodeIntegration: false`
	- `webviewTag: true`

## Run

```bash
cd <PATH_FOR_SAMPLE>
npm install
npm start
```

After launch, click one of the three buttons to Pause, Play, or loop play/pause.

## Files

- `main.js`: creates the `BrowserWindow`, enables webview support, and handles IPC for context menu actions.
- `preload.js`: exposes a safe host API to the renderer.
- `render.js`: renderer logic and webview command wiring.
- `inject.js`: guest-side helper methods injected into the YouTube page.
- `index.html`: host UI containing controls and the webview.

## Notes

- This is an educational sample and intentionally uses `webview.executeJavaScript(...)` to keep the host/guest RPC idea explicit.
- If you build this pattern into production code, validate inputs and tighten process boundaries further.
