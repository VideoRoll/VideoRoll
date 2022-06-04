/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import VideoRoll from "./VideoRoll";

let currentFlip = "none";

/**
 * get badge text
 * @returns
 */
function getTabBadge(): string {
    const hostName = VideoRoll.getHostName();
    const videoSelector = VideoRoll.getVideoSelector(hostName);
    const dom = VideoRoll.getVideoDom(videoSelector, document);

    return dom ? "1" : "";
}

(function () {
    /**
     * get message
     */
    chrome.runtime.onMessage.addListener((a, b, c) => {
        const { webInfo, style, tabId, flip } = a;

        try {
            if (flip) {
                c("flip");
                return;
            }

            /**
             * set badge
             */
            if (tabId) {
                const text = getTabBadge();
                c({ text });
                return;
            } else if (style) {
                VideoRoll.addStyleClass();
                chrome.runtime.sendMessage(
                    { flip: currentFlip },
                    function (response) {}
                );
            } else {
                currentFlip = webInfo.flip || currentFlip;
                VideoRoll.rotateVideo(
                    webInfo.deg,
                    currentFlip,
                    webInfo.videoSelector
                        ? webInfo.videoSelector
                        : VideoRoll.getVideoSelector(VideoRoll.getHostName())
                );
            }
            c("rotate success");
        } catch (err) {
            console.debug(err);
        }
    });
})();
