window.onresize = doLayout;

// Runs inside the guest page and performs media actions on an existing site.
// This is the core host-to-guest bridge pattern used by this sample.
function runGuestAction(webview, action) {
    var js = "(function(){" +
        "var p=document.getElementById('movie_player');" +
        "var v=document.querySelector('video');" +
        "var clearLoop=function(){if(window.__ytLoopTimer){clearTimeout(window.__ytLoopTimer);window.__ytLoopTimer=null;}};" +
        "var pause=function(){if(p&&typeof p.pauseVideo==='function'){p.pauseVideo();window.__ytPaused=true;return true;}if(v){v.pause();window.__ytPaused=true;return true;}return false;};" +
        "var play=function(){if(p&&typeof p.playVideo==='function'){p.playVideo();window.__ytPaused=false;return true;}if(v){var r=v.play();window.__ytPaused=false;return !!r||r===undefined;}return false;};" +
        "if('" + action + "'==='pause'){clearLoop();return pause();}" +
        "if('" + action + "'==='play'){clearLoop();return play();}" +
        "if('" + action + "'==='loop'){" +
          "clearLoop();" +
          "if(typeof window.__ytPaused!=='boolean'){window.__ytPaused=true;}" +
          "var tick=function(){if(window.__ytPaused){play();}else{pause();}window.__ytLoopTimer=setTimeout(tick,1000);};" +
          "tick();" +
          "return true;" +
        "}" +
        "return false;" +
    "})()";

    webview.executeJavaScript(js, true).then(function (ok) {
        if (!ok) {
            console.warn('Guest action did not find a controllable player:', action);
        }
    }).catch(function (err) {
        console.error('Guest action failed for ' + action + ':', err);
    });
}

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
    window.hostApi.showContextMenu();
}, false);

onload = function() {
    var webview = document.querySelector('webview');

    // Initial call demonstrates that host code can invoke guest-page behavior.
    webview.addEventListener("dom-ready", function(){
        runGuestAction(webview, 'pause');
        // webview.openDevTools();
    });

    doLayout();

    document.querySelector('#pause').onclick = function() {
        runGuestAction(webview, 'pause');
    };

    document.querySelector('#play').onclick = function() {
        runGuestAction(webview, 'play');
    };

    document.querySelector('#pauseNstart').onclick = function() {
        runGuestAction(webview, 'loop');
    };

};

// Keep the webview sized to the host window while preserving control bar space.
function doLayout() {
    var webview = document.querySelector('webview');
    var controls = document.querySelector('#controls');
    var controlsHeight = controls.offsetHeight;
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var webviewWidth = windowWidth;
    var webviewHeight = windowHeight - controlsHeight;

    webview.style.width = webviewWidth + 'px';
    webview.style.height = webviewHeight + 'px';
}

function handleExit(event) {
    console.log(event.type);
    document.body.classList.add('exited');
    if (event.type == 'abnormal') {
        document.body.classList.add('crashed');
    } else if (event.type == 'killed') {
        document.body.classList.add('killed');
    }
}
