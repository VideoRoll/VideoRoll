/*
 * @description: VideoRoll class
 * @Author: Gouxinyu
 * @Date: 2022-05-31 23:27:36
 */
import WEBSITE from "../website";
import Jungle from "./jungle";
import { Flip, IMove, IFilter, FilterUnit, IRollConfig, FlipType, IVideoDom } from '../types/type.d';

export default class VideoRoll {
    static rollConfig: IRollConfig;

    static audioCtx: AudioContext;

    static audioController: Jungle

    static setRollConfig(rollConfig: IRollConfig) {
        this.rollConfig = rollConfig;
        return this;
    }

    /**
     * get url host name
     * @returns
     */
    static getHostName(): string {
        // url reg
        const url = window.location.href;
        const urlReg = /^http(s)?:\/\/(.*?)\//;
        const hostName = urlReg.exec(url)?.[2] ?? '';
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
        backupDom: HTMLVideoElement | HTMLElement | null,
        deg: number
    ): [number, number] {
        // get video size
        let { videoWidth, videoHeight, offsetWidth, offsetHeight } = dom;

        const isHorizonDeg = deg === 90 || deg === 270;

        if (backupDom && (typeof videoWidth === "undefined" || videoWidth === null)) {
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
            return Number.isNaN(scale) ? [1, 1] : [scale, scale];
        }

        // 2.若是竖屏视频，横屏中，旋转回0或180
        if (!isHorizonDeg && !isHorizonVideo && isHorizonDom) {
            return [1, 1];
        }

        // 3.若是横屏视频，处在横屏容器中
        if (isHorizonDeg && isHorizonVideo && isHorizonDom) {
            const value = offsetHeight / offsetWidth;
            return [value, value];
        }

        if (!isHorizonDeg && isHorizonVideo && isHorizonDom) {
            return [1, 1];
        }

        // 若是竖屏且容器为竖屏
        if (!isHorizonVideo && !isHorizonDom && isHorizonDeg) {
            const value = videoWidth / videoHeight;
            return [value, value];
        }

        return [1, 1];
    }

    /**
     * find iframe and its document
     * @returns
     */
    static getIframeDoc(doc = document): Document {
        const iframe = doc.querySelector("iframe");
        if (iframe) {
            return iframe.contentDocument || doc;
        }
        return doc;
    }

    /**
     * get video dom element
     * @param videoSelector
     * @param doc
     * @returns
     */
    static getVideoDom(videoSelector: string[], doc: Document, dom: HTMLVideoElement | null = null): IVideoDom {
        let backupDom = null;
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
                return { dom, backupDom };
            }
        }

        if (!dom) {
            const docWin = this.getIframeDoc(doc);
            if (docWin && docWin !== document) {
                try {
                    return this.getVideoDom(videoSelector, docWin);
                } catch (e) {
                    console.warn(`rotate video failed: ${e}`);
                }
            }
        }

        return { dom, backupDom };
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
        rollConfig: IRollConfig,
        dom: HTMLVideoElement | null,
        doc: Document
    ): void {
        this.setRollConfig(rollConfig);
        const { deg, flip, scale, zoom, move, filter, videoSelector } = rollConfig;

        const { dom: videoDom, backupDom } = this.getVideoDom(videoSelector, doc, dom);

        dom = videoDom;

        if (dom) {
            const scaleNum = this.rollConfig.isInit || scale.mode === 'custom' ? scale.values : this.getScaleNumber(dom, backupDom, deg);

            this.rollConfig.scale.values = scaleNum;
            this.replaeClass({ deg, flip, scale: scaleNum, zoom, move, filter }, doc);

            dom.classList.add("video-roll-transition");
            dom.classList.add("video-roll-deg-scale");
            dom.setAttribute("data-roll", "true");
            return;
        }
    }

    /**
     * 旋转视频
     * @param deg
     * @param videoSelector
     * @returns
     */
    static updateVideo(rollConfig: IRollConfig) {
        let dom = null;
        this.setVideoDeg(rollConfig, dom, document);
        // if there is no video element, search iframe
        if (!dom) {
            const doc = this.getIframeDoc();
            if (doc && doc !== document) {
                try {
                    this.setVideoDeg(rollConfig, dom, doc);
                } catch (e) {
                    console.warn(`rotate video failed: ${e}`);
                    return this;
                }
            }
        }

        return this;
    }

    static getFilterStyle(filter: IFilter) {
        let filterStyle = '';

        Object.keys(filter).filter((type) => type !== 'mode').forEach((type: string) => {
            filterStyle += ` ${type}(${filter[type as keyof IFilter]}${(FilterUnit as any)[typeof type]})`
        });

        return filterStyle;
    }

    /**
     * change class content
     * @param deg
     * @param scaleNum
     */
    static replaeClass(rollConfig: {
        deg: number,
        flip: Flip,
        scale: [number, number],
        zoom: number,
        move: IMove,
        filter: IFilter
    },
        doc = document
    ) {
        const { deg, flip, scale, zoom, move, filter } = rollConfig;
        const degScale = doc.getElementById("video-roll-deg-scale") as HTMLElement;

        const filterStyle = filter.mode === 'custom' ? this.getFilterStyle(filter) : filter.mode;

        degScale.innerHTML = `.video-roll-deg-scale { transform: ${FlipType[flip]} rotate(${deg}deg) scale3d(${zoom}, ${zoom}, 1) scale(${scale[0]}, ${scale[1]}) translate(${move.x}%, ${-move.y}%) !important; filter: ${filterStyle};`;
    }

    /**
     * 是否存在class
     * @returns
     */
    static isExistStyle(doc = document) {
        const degScale = doc.getElementById("video-roll-deg-scale");
        const transition = doc.getElementById("video-roll-transition");

        return degScale && transition ? [degScale, transition] : null;
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

    static getRollConfig() {
        return this.rollConfig;
    }

    /**
     * add style
     * @returns
     */
    static addStyleClass(isClear: boolean = false) {
        const videoSelecter = this.getVideoSelector(this.getHostName());
        const { dom } = this.getVideoDom(videoSelecter, document);

        if (!dom) return this;

        const doc = document.body.contains(dom)
            ? document
            : this.getIframeDoc();
        const styles = this.isExistStyle(doc);

        const { storeThisTab, store } = this.getRollConfig();

        if (styles) {

            if (!isClear) return this;

            if (!storeThisTab && !store) {
                styles[0].innerHTML = `
                .video-roll-deg-scale {}
            `;
                return this;
            }

            return this;
        }

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

        if (storeThisTab) {
            this.updateVideo(this.rollConfig);
        }

        return this;
    }

    static updatePitch() {
        if (!this.audioCtx) {
            this.audioCtx = new AudioContext();
            const { audioCtx } = this;
            const { dom } = this.getVideoDom(this.rollConfig.videoSelector, document);
            
            if (!dom) return;

            const node = audioCtx.createMediaElementSource(dom as HTMLMediaElement);
            this.audioController = new Jungle(audioCtx);
            this.audioController.output.connect(audioCtx.destination);
            node.connect(this.audioController.input);
            this.audioController.setPitchOffset(this.rollConfig.pitch);
            return;
        }

        if (this.audioController) {
            this.audioController.setPitchOffset(this.rollConfig.pitch);
        }
    }
}
