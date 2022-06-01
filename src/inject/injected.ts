/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import VideoRoll from "./VideoRoll";

function getTabBadge() {
    // url reg
    const url = window.location.href;
    const urlReg = /^http(s)?:\/\/(.*?)\//;
    const hostName = urlReg.exec(url)?.[2];
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
            VideoRoll.rotateVideo(deg, webInfo.videoSelector);
        }

        c("rotate success");
    });
})();
