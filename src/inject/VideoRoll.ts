/*
 * @description: VideoRoll class
 * @Author: Gouxinyu
 * @Date: 2022-05-31 23:27:36
 */
import WEBSITE from "../website";
import Jungle from "./jungle";
import { Flip, IMove, IFilter, FilterUnit, IRollConfig, FlipType, VideoSelector, VideoElement, VideoObject } from '../types/type.d';

export default class VideoRoll {
    static rollConfig: IRollConfig;

    static audioCtx: AudioContext;

    static audioController: Jungle[] = [];

    static videoElements: VideoElement[] = [];

    static documents: Document[] = [];

    static videoNumbers: number = 0;

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
        target: VideoElement,
        deg: number
    ): [number, number] {
        let videoWidth = 0;
        let videoHeight = 0;
        let offsetWidth = 0;
        let offsetHeight = 0;

        if (typeof target === 'object' && 'wrapElement' in target && 'shadowElement' in target) {
            offsetWidth = target.shadowElement.offsetWidth;
            offsetHeight = target.shadowElement.offsetHeight;
            videoWidth = offsetWidth;
            videoHeight = offsetHeight;
        } else {
            offsetWidth = target.offsetWidth;
            offsetHeight = target.offsetHeight;
            videoWidth = target.videoWidth;
            videoHeight = target.videoHeight;
        }

        const isHorizonDeg = deg === 90 || deg === 270;

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
     * get all documnets includes iframes
     */
    static updateDocuments() {
        const iframes = document.querySelectorAll("iframe") ?? [];
        const iframeEls: HTMLIFrameElement[] = Array.from(iframes).filter((v) => v.contentDocument);

        this.documents = [document, ...iframeEls.map((v) => v.contentDocument as Document)];

        return this;
    }

    /**
     * get all video elements
     */
    static updateVideoElements(videoSelector: VideoSelector) {
        if (!this.documents.length) return;

        this.clearVideoElements();
        this.documents.forEach((doc) => {
            this.setVideoBySelector(videoSelector, doc);
        });

        return this;
    }

    /**
     * clear all cache
     */
    static clearVideoElements() {
        this.videoElements = [];
    }

    /**
     * set videoElements
     * @param videoSelector 
     * @param doc 
     * @returns 
     */
    static setVideoBySelector(videoSelector: VideoSelector, doc: Document | HTMLIFrameElement) {
        const { shadowDom, defaultDom, wrapDom } = videoSelector;

        if (shadowDom && wrapDom) {
            const shadowElement = doc.querySelector(shadowDom);
            const wrapElement = doc.querySelector(wrapDom);
            // if is shadow element, we can't get videoWidth and videoHeight, so we need use wrapDom
            if (shadowElement && wrapElement) {
                this.videoElements.push({ shadowElement, wrapElement } as VideoElement);
                this.setVideoNumbers();
                return;
            }
        }

        if (defaultDom) {
            const defaultElements: NodeListOf<HTMLVideoElement> = doc.querySelectorAll(defaultDom);
            if (defaultElements) {
                this.videoElements.push(...Array.from(defaultElements));
            }
        }

        this.setVideoNumbers();
    }

    static setVideoNumbers(): void {
        this.videoNumbers = this.videoElements.length;
    }

    /**
     * set video rotate deg
     * @param rollConfig
     * @returns
     */
    static updateVideo(
        rollConfig: IRollConfig
    ) {
        this.setRollConfig(rollConfig);
        const { deg, flip, scale, zoom, move, filter } = rollConfig;

        for(const target of this.videoElements) {
            const dom = (target as VideoObject).shadowElement ?? target;

            // if a video's readyState is empty, ignore it. 
            if ('readyState' in dom && (dom.readyState as number) === 0) {
                continue;
            }

            const scaleNum = this.rollConfig.isInit || scale.mode === 'custom' ? scale.values : this.getScaleNumber(target, deg);

            this.rollConfig.scale.values = scaleNum;
            this.documents.forEach((doc) => {
                this.replaceClass({ deg, flip, scale: scaleNum, zoom, move, filter }, doc);
            });

            dom.classList.add("video-roll-transition");
            dom.classList.add("video-roll-deg-scale");
            dom.setAttribute("data-roll", "true");
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
    static replaceClass(rollConfig: {
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
    static isExistStyle(doc: Document) {
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
        let videoSelector = {
            defaultDom: 'video'
        };

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
     * get roll config
     * @returns
     */
    static getRollConfig() {
        return this.rollConfig;
    }

    /**
     * add style
     * @returns
     */
    static addStyleClass(isClear: boolean = false) {
        const { storeThisTab, store } = this.getRollConfig();

        this.documents.forEach((doc) => {
            const styles = this.isExistStyle(doc);

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
        });

        if (storeThisTab) {
            this.updateVideo(this.rollConfig);
        }

        return this;
    }

    /**
     * update pitch
     * @returns 
     */
    static async updatePitch() {
        if (!this.audioCtx) {
            this.audioCtx = new AudioContext();
            const { audioCtx } = this;

            this.videoElements.forEach((dom) => {
                const node = audioCtx.createMediaElementSource(dom as HTMLMediaElement);
                this.audioController.push(new Jungle(audioCtx));
                this.audioController.forEach((v) => {
                    v.output.connect(audioCtx.destination);
                    node.connect(v.input);
                    v.setPitchOffset(this.rollConfig.pitch);
                });
            });
            return;
        }

        if (this.audioController) {
            this.audioController.forEach((v) => {
                v.setPitchOffset(this.rollConfig.pitch);
            })
        }
    }
}
