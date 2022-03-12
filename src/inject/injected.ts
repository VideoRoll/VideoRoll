/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

/**
 * 计算视频缩放比例
 * @param dom
 * @param deg
 * @returns
 */
function getScaleNumber(
    dom: HTMLVideoElement,
    backupDom: HTMLElement,
    deg: number
) {
    // get video size
    let { videoWidth, videoHeight, offsetWidth, offsetHeight } = dom;

    const isHorizonDeg = deg === 90 || deg === 270;

    if (typeof videoWidth === "undefined" || videoWidth === null) {
        videoWidth = backupDom.offsetWidth;
        videoHeight = backupDom.offsetHeight;
    }
    // 根据原始视频的宽高比例，和容器的宽高比例，计算缩放比例
    const isHorizonVideo = videoWidth > videoHeight;
    const isHorizonDom = offsetWidth > offsetHeight;

    // 判断旋转后的缩放比例
    // 1.若是竖屏视频，但在横屏容器中，初始就是等比缩小的
    if (isHorizonDeg && !isHorizonVideo && isHorizonDom) {
        const scale = videoHeight / videoWidth;
        // if video element is shadowdom, cant get video height;
        return Number.isNaN(scale) ? 1 : scale;
    }

    // 2.若是竖屏视频，横屏中，旋转回0或180
    if (!isHorizonDeg && !isHorizonVideo && isHorizonDom) {
        return 1;
    }

    // 3.若是横屏视频，处在横屏容器中
    if (isHorizonDeg && isHorizonVideo && isHorizonDom) {
        return offsetHeight / offsetWidth;
    }

    if (!isHorizonDeg && isHorizonVideo && isHorizonDom) {
        return 1;
    }

    return 1;
}

/**
 * 旋转视频
 * @param deg
 * @param videoSelector
 * @returns
 */
function rotateVideo(deg: number, videoSelector: string[]) {
    for (const item of videoSelector) {
        const isArray = Array.isArray(item);
        const dom = document.querySelector(
            isArray ? item[0] : item
        ) as HTMLVideoElement;
        const backupDom = isArray
            ? (document.querySelector(item[1]) as HTMLElement)
            : dom;

        if (!dom) continue;

        if (dom) {
            const scale = getScaleNumber(dom, backupDom, deg);
            dom.style.transform = `rotate(${deg}deg) scale(${scale})`;
            return;
        }
    }
}

(function () {
    chrome.runtime.onMessage.addListener((a, b) => {
        const { webInfo, deg } = a;
        rotateVideo(deg, webInfo.videoSelector);
    });
})();
