/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */
import throlltle from "../utils/throlltle";

let observer = null;

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
 * find iframe and its document
 * @returns
 */
function getIframeDoc(): Document | null {
    const iframe = document.querySelector("iframe");
    if (iframe) {
        return iframe.contentDocument;
    }
    return null;
}

/**
 * set video rotate deg
 * @param deg
 * @param videoSelector
 * @param dom
 * @param doc
 * @returns
 */
function setVideoDeg(
    deg: number,
    videoSelector: string[],
    dom: HTMLVideoElement,
    doc: Document
): void {
    for (const item of videoSelector) {
        const isArray = Array.isArray(item);
        dom = doc.querySelector(isArray ? item[0] : item) as HTMLVideoElement;
        const backupDom = isArray
            ? (document.querySelector(item[1]) as HTMLElement)
            : dom;

        if (!dom) continue;

        if (dom) {
            const scale = getScaleNumber(dom, backupDom, deg);
            dom.classList.add(`video-roll-${deg} video-roll-transition`);
            changeScaleNumber(scale);
            dom.classList.add("video-roll-scale");
            dom.setAttribute("data-roll", "true");

            // fullScrenStyle(dom, {
            //     transition: "all 0.5s ease",
            //     transform: `rotate(${deg}deg) scale(${scale})`,
            // });
            return;
        }
    }
}

/**
 * 旋转视频
 * @param deg
 * @param videoSelector
 * @returns
 */
function rotateVideo(deg: number, videoSelector: string[]): void {
    let dom = null;
    addStyleClass();
    setVideoDeg(deg, videoSelector, dom, document);
    // if there is no video element, search iframe
    if (!dom) {
        const doc = getIframeDoc();
        if (doc) {
            try {
                setVideoDeg(deg, videoSelector, dom, doc);
            } catch (e) {
                console.warn(`rotate video failed: ${e}`);
            }
        }
    }
}

function changeScaleNumber(scaleNum: number) {
    const scale = document.getElementById("video-roll-scale");
    scale.innerHTML = `.video-roll-scale: { scale(${scaleNum}); }`;
}

/**
 * 是否存在class
 * @returns
 */
function isExistStyle() {
    const deg = document.getElementById("video-roll-deg");
    const scale = document.getElementById("video-roll-scale");

    return deg && scale;
}

function addStyleClass() {
    const already = isExistStyle();
    if (already) return;
    const deg = document.createElement("style");
    const scale = document.createElement("style");
    deg.innerHTML = `
        .video-roll-90: {
            transform: rotate(90deg);
        }

        .video-roll-180: {
            transform: rotate(180deg);
        }

        .video-roll-270: {
            transform: rotate(270deg);
        }

        .video-roll-360: {
            transform: rotate(270deg);
        }

        .video-roll-transition: {
            transition: all 0.5s ease;
        }
    `;

    scale.innerHTML = `.video-roll-scale: { scale(1); }`;

    deg.setAttribute("id", "video-roll-deg");
    scale.setAttribute("id", "video-roll-scale");

    const head = document.getElementsByName("head")[0];
    head.appendChild(deg);
    head.appendChild(scale);
}

/**
 * 全屏时更新
 */
function fullScrenStyle(dom, style) {
    const observerFn = function (entries) {
        for (let entry of entries) {
            console.log(style);
            entry.target.classList.add("video-roll");
        }
    };

    if (!observer) {
        const resizeObserver = new ResizeObserver(throlltle(observerFn, 500));
        observer = resizeObserver;
        resizeObserver.observe(dom);
    }
}

(function () {
    chrome.runtime.onMessage.addListener((a, b, c) => {
        const { webInfo, deg } = a;
        rotateVideo(deg, webInfo.videoSelector);
        c("rotate success");
    });
})();
