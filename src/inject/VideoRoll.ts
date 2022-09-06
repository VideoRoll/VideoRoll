/*
 * @description: VideoRoll class
 * @Author: Gouxinyu
 * @Date: 2022-05-31 23:27:36
 */
import WEBSITE from "../website";

const flipStyle = {
    unset: "",
    vertical: "rotate3d(1, 0, 0, 180deg)",
    horizontal: "rotate3d(0, 1, 0, 180deg)",
};
export default class VideoRoll {
    /**
     * get url host name
     * @returns
     */
    static getHostName(): string {
        // url reg
        const url = window.location.href;
        const urlReg = /^http(s)?:\/\/(.*?)\//;
        const hostName = urlReg.exec(url)?.[2];
        return hostName;
    }

    /**
     * 计算视频缩放比例
     * @param dom
     * @param deg
     * @returns
     */
    static getScaleNumber(
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
            const scale = offsetWidth / offsetHeight;
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

        // 若是竖屏且容器为竖屏
        if (!isHorizonVideo && !isHorizonDom && isHorizonDeg) {
            return videoWidth / videoHeight;
        }

        return 1;
    }

    /**
     * find iframe and its document
     * @returns
     */
    static getIframeDoc(doc = document): Document | null {
        const iframe = doc.querySelector("iframe");
        if (iframe) {
            return iframe.contentDocument;
        }
        return null;
    }

    /**
     * get video dom element
     * @param videoSelector
     * @param doc
     * @returns
     */
    static getVideoDom(videoSelector, doc) {
        let dom = null;
        for (const item of videoSelector) {
            const isArray = Array.isArray(item);
            dom = doc.querySelector(
                isArray ? item[0] : item
            ) as HTMLVideoElement;

            if (!dom) continue;

            if (dom) {
                return dom;
            }
        }

        if (!dom) {
            const docWin = this.getIframeDoc(doc);
            if (docWin) {
                try {
                    return this.getVideoDom(videoSelector, docWin);
                } catch (e) {
                    console.warn(`rotate video failed: ${e}`);
                }
            }
        }
    }

    /**
     * set video rotate deg
     * @param deg
     * @param videoSelector
     * @param dom
     * @param doc
     * @returns
     */
    static setVideoDeg(
        deg: number,
        flip: string,
        videoSelector: string[],
        dom: HTMLVideoElement,
        doc: Document
    ): void {
        for (const item of videoSelector) {
            const isArray = Array.isArray(item);
            dom = doc.querySelector(
                isArray ? item[0] : item
            ) as HTMLVideoElement;
            const backupDom = isArray
                ? (doc.querySelector(item[1]) as HTMLElement)
                : dom;

            if (!dom) continue;

            if (dom) {
                const scale = this.getScaleNumber(dom, backupDom, deg);
                this.replaeClass(deg, flip, scale, doc);

                dom.classList.add("video-roll-transition");
                dom.classList.add("video-roll-deg-scale");
                dom.setAttribute("data-roll", "true");
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
    static rotateVideo(
        deg: number,
        flip: string,
        videoSelector: string[]
    ): void {
        let dom = null;
        this.addStyleClass();
        this.setVideoDeg(deg, flip, videoSelector, dom, document);
        // if there is no video element, search iframe
        if (!dom) {
            const doc = this.getIframeDoc();
            if (doc) {
                try {
                    this.setVideoDeg(deg, flip, videoSelector, dom, doc);
                } catch (e) {
                    console.warn(`rotate video failed: ${e}`);
                }
            }
        }
    }

    /**
     * change class content
     * @param deg
     * @param scaleNum
     */
    static replaeClass(
        deg: number,
        flip: string,
        scaleNum: number,
        doc = document
    ) {
        const degScale = doc.getElementById("video-roll-deg-scale");
        degScale.innerHTML = `.video-roll-deg-scale { transform: ${flipStyle[flip]} rotate(${deg}deg) scale(${scaleNum}) !important; }`;
    }

    /**
     * 是否存在class
     * @returns
     */
    static isExistStyle(doc = document) {
        const degScale = doc.getElementById("video-roll-deg-scale");
        const transition = doc.getElementById("video-roll-transition");

        return degScale && transition;
    }

    /**
     * get video dom selector
     * @param hostName
     * @returns
     */
    static getVideoSelector(hostName: string) {
        let videoSelector = ["video"];
        if (!hostName) {
            return videoSelector;
        }

        for (const key of Object.keys(WEBSITE)) {
            if (hostName.includes(key)) {
                const target = WEBSITE[key];
                videoSelector = target.videoSelector;
                return videoSelector;
            }
        }

        return videoSelector;
    }

    /**
     * add style
     * @returns
     */
    static addStyleClass() {
        const videoSelecter = this.getVideoSelector(this.getHostName());
        const dom = this.getVideoDom(videoSelecter, document);

        if (!dom) return;

        const doc = document.body.contains(dom)
            ? document
            : this.getIframeDoc();
        const already = this.isExistStyle(doc);
        if (already) return;

        const degScale = doc.createElement("style");
        const transition = doc.createElement("style");
        degScale.innerHTML = `
        .video-roll-deg-scale {}
    `;

        transition.innerHTML = `.video-roll-transition {
            transition: all 0.5s ease !important;
        }`;

        degScale.setAttribute("id", "video-roll-deg-scale");
        transition.setAttribute("id", "video-roll-transition");

        degScale.setAttribute("type", "text/css");
        transition.setAttribute("type", "text/css");

        const head = doc.getElementsByTagName("head")[0];
        head.appendChild(degScale);
        head.appendChild(transition);
    }
}
