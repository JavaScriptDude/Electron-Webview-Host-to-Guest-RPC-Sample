// This object is injected into the guest page through the webview preload hook.
// Host code can call these methods by name via webview.executeJavaScript(...).
__myYoutubeTools = {
    getMP: function () {
        return document.getElementById('movie_player');
    },
    // Pause and clear any active loop timer so one-off pause behaves predictably.
    pauseVideo: function () {
        var t = __myYoutubeTools;
        var mp = t.getMP();
        t.clearPNSTo();
        if (!mp || typeof mp.pauseVideo !== 'function') {
            return false;
        }
        mp.pauseVideo();
        t.isPaused = true;
        return true;
    },
    // Play and clear any active loop timer so one-off play behaves predictably.
    playVideo: function () {
        var t = __myYoutubeTools;
        var mp = t.getMP();
        t.clearPNSTo();
        if (!mp || typeof mp.playVideo !== 'function') {
            return false;
        }
        mp.playVideo();
        t.isPaused = false;
        return true;
    },
    clearPNSTo: function () {
        var t = __myYoutubeTools;
        if (t.toPNS) {
            clearTimeout(t.toPNS);
            t.toPNS = null;
        }
    },
    isPaused: true,
    toPNS: null,
    // Demo loop: toggle play/pause every second until another action clears timer.
    playNpauseVideo: function () {
        var t = __myYoutubeTools;
        if (t.isPaused) {
            t.playVideo();
        } else {
            t.pauseVideo();
        }
        t.toPNS = setTimeout(function () {
            __myYoutubeTools.playNpauseVideo();
        }, 1000);
    }
};
