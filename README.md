# Electron Webview Host to Guest RPC Sample

 This is a contrived example of how to make a tool that is able to make crude RPC calls from an [electron](https://github.com/atom/electron) host app in the Renderer JS to a remote guest web page in a [webview](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md) element.

 This example uses the webview [preload](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md#preload) attribute to inject custom code into a remote websites page and invokes the code using the [&lt;webview&gt;.executeJavaScript](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md#webviewexecutejavascriptcode-usergesture).

 To run this, install electron and then run in the console
 ```
cd <PATH_FOR_SAMPLE>
electron .
 ```

 The click on one of the three buttons at the top of the page to Pause, Play or loop play and pause.

 This code is based on the the cool [webview browser](https://github.com/hokein/electron-sample-apps/tree/master/webview/browser) electron sample app written by [hokein](https://github.com/hokein). Props to you @hokein!
