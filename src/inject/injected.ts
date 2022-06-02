/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import VideoRoll from "./VideoRoll";

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
        const { webInfo, deg, style, tabId } = a;

        try {
            /**
             * set badge
             */
            if (tabId) {
                const text = getTabBadge();
                c({ text });
                return;
            } else if (style) {
                VideoRoll.addStyleClass();
            } else {
                VideoRoll.rotateVideo(
                    deg,
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
