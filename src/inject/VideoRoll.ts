/*
 * @description: VideoRoll class
 * @Author: Gouxinyu
 * @Date: 2022-05-31 23:27:36
 */
import WEBSITE from "../website";
import Audiohacker from "audio-hacker";
import { Flip, IMove, IFilter, Focus, FilterUnit, IRollConfig, FlipType, VideoSelector, VideoElement, VideoObject, IRealVideoPlayer } from '../types/type.d';
import { nanoid } from "nanoid";

export default class VideoRoll {
    static rollConfig: IRollConfig;

    static audioCtx: AudioContext | null = null;

    static audioController: Audiohacker[] = [];

    static volumeController: any[] = [];

    static videoElements: VideoElement[] = [];

    static documents: Document[] = [];

    static videoNumbers: number = 0;

    static realVideoPlayer: IRealVideoPlayer = { width: 0, height: 0, player: null };

    static rootElement: HTMLElement | undefined;

    static observer: MutationObserver;

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

        this.documents = [document, ...iframeEls.map((v) => {
            if (v.contentDocument) {
                // @ts-ignore
                v.contentDocument.iframeElement = v;
            }
            return v.contentDocument as Document;
        })];

        return this;
    }

    /**
     * get all video elements
     */
    static updateVideoElements(videoSelector: VideoSelector) {
        if (!this.documents.length) return;

        this.clearVideoElements();
        this.clearRootElement();
        this.clearRealVideoPlayer();

        this.documents.forEach((doc) => {
            this.setVideoBySelector(videoSelector, doc);
        });

        return this;
    }

    static updateVideoNumbers(videoSelector: VideoSelector) {
        if (!this.documents.length) return;

        this.documents.forEach((doc) => {
            this.setVideoBySelector(videoSelector, doc);
        });

        return this;
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
            // if it is shadow element(whitch hides its content), we can't get videoWidth and videoHeight, so we need use wrapDom
            if (shadowElement && wrapElement) {
                this.videoElements.push({ shadowElement, wrapElement } as VideoElement);
                this.setVideoNumbers();
                return;
            }
        }

        if (defaultDom) {
            const defaultElements: NodeListOf<HTMLVideoElement> = doc.querySelectorAll(defaultDom);
            const videos = Array.from(defaultElements);
            if (defaultElements) {
                this.videoElements.push(...videos.map((v, i) => {
                    // @ts-ignore
                    v.parentDocument = doc;
                    v.dataset.videoRollId = nanoid();

                    if (i === 0) {
                        this.setRealVideoPlayer(v);
                    } else if (this.isRealVideoPlayer(v)) {
                        this.setRealVideoPlayer(v);
                    }

                    return v;
                }));
            }
        }

        this.setVideoNumbers();
    }

    static setVideoNumbers(): void {
        this.videoNumbers = this.videoElements.length;
    }

    static setRootElement(element: HTMLElement) {
        this.rootElement = element;
    }

    static setRealVideoPlayer(realPlayer: HTMLVideoElement) {
        this.realVideoPlayer = {
            width: realPlayer.offsetWidth,
            height: realPlayer.offsetHeight,
            player: realPlayer
        };
    }

    /**
     * clear all cache
     */
    static clearVideoElements() {
        this.videoElements.length = 0;
        this.videoElements = [];
    }

    static clearRootElement() {
        this.rootElement = void 0;
    }

    static clearRealVideoPlayer() {
        this.realVideoPlayer = { width: 0, height: 0, player: null };
    }

    static isRealVideoPlayer(player: HTMLVideoElement): boolean {
        const isSmaller = player.offsetWidth < this.realVideoPlayer.width || player.offsetHeight < this.realVideoPlayer.height;

        // this may be ads video player
        if (player.muted && player.loop && isSmaller) return false;

        if ('readyState' in player && player.readyState === 0) return false;

        if (isSmaller && player.readyState === 0) return false;

        return true;
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
        const { deg, flip, scale, zoom, move, filter, focus, pictureInPicture } = rollConfig;

        for (const target of this.videoElements) {
            const dom = (target as VideoObject).shadowElement ?? target;

            // if a video's readyState is empty, ignore it. 
            if (!this.isRealVideoPlayer(dom as HTMLVideoElement)) continue;

            let scaleNum: [number, number] = [1, 1];

            if (rollConfig.isAutoChangeSize) {
                scaleNum = this.rollConfig.isInit || scale.mode === 'custom' ? scale.values : this.getScaleNumber(target, deg);
            }

            this.rollConfig.scale.values = scaleNum;
            this.documents.forEach((doc) => {
                this.replaceClass({ deg, flip, scale: scaleNum, zoom, move, filter, focus }, doc);

                this.videoElements.forEach((video) => {
                    this.updateFocus(doc, video as HTMLVideoElement, focus.on);
                    this.togglePictureInPicture(pictureInPicture);
                });
            });

            dom.classList.add("video-roll-transition");
            dom.classList.add("video-roll-deg-scale");
            dom.setAttribute("data-roll", "true");
        }

        return this;
    }

    /**
     * update audio
     */
    static async updateAudio() {
        await this.updatePitch();
        await this.updateVolume();
        this.updatePlaybackRate();
        return this;
    }

    static getFilterStyle(filter: IFilter) {
        let filterStyle = '';

        Object.keys(filter).filter((type) => type !== 'mode').forEach((type: string) => {
            filterStyle += ` ${type}(${filter[type as keyof IFilter]}${(FilterUnit as any)[type]})`;
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
        filter: IFilter,
        focus: Focus
    },
        doc = document
    ) {
        const { deg, flip, scale, zoom, move, filter, focus } = rollConfig;
        const degScale = doc.getElementById("video-roll-deg-scale") as HTMLElement;

        const filterStyle = filter.mode === 'custom' ? this.getFilterStyle(filter) : filter.mode;

        degScale.innerHTML = `.video-roll-deg-scale { 
            transform: ${FlipType[flip]} rotate(${deg}deg) scale3d(${zoom}, ${zoom}, 1) scale(${scale[0]}, ${scale[1]}) translate(${move.x}%, ${-move.y}%) !important; 
            filter: ${filterStyle}; 
        }
        #video-roll-root-mask {
            display: ${focus.on ? 'block' : 'none'};
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px);
            z-index: 20000 !important;
            background-color: rgba(0, 0, 0, 0.8);
        }
        `;
    }

    /**
     * 是否存在class
     * @returns
     */
    static isExistStyle(doc: Document) {
        const degScale = doc.getElementById("video-roll-deg-scale");
        const transition = doc.getElementById("video-roll-transition");
        const root = document.getElementById("video-roll-root");

        return degScale && transition && root ? [degScale, transition, root] : null;
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

            if (head) {
                head.appendChild(degScale);
                head.appendChild(transition);
            }

            this.addMaskElement();
        });

        if (storeThisTab) {
            this.updateVideo(this.rollConfig);
        }

        return this;
    }

    /**
     * add mask element(for focus mode)
     */
    static addMaskElement() {
        const root = document.createElement("style");
        root.innerHTML = '.video-roll-root {}';
        root.setAttribute("id", "video-roll-root");
        root.setAttribute("type", "text/css");

        const documentHead = document.getElementsByTagName("head")[0];
        documentHead.appendChild(root);

        if (!document.getElementById('video-roll-root-mask')) {
            const mask = document.createElement("div");
            mask.setAttribute("id", "video-roll-root-mask");
            document.body.appendChild(mask);
        }
    }

    /**
     * find the video's root wrapper element
     * @param dom
     * @param rect
     * @returns
     */
    static findVideoRootElement(dom: HTMLElement, rect: [number, number]): HTMLElement {
        const { parentElement } = dom;

        if (parentElement && (parentElement.offsetWidth === rect[0] || parentElement.offsetHeight <= rect[1])) {
            return this.findVideoRootElement(parentElement, rect);
        }

        return dom;
    }

    /**
     * update focus mode
     * @param doc
     * @param video 
     * @param focus
     * @returns
     */
    static updateFocus(doc: Document, video: HTMLVideoElement, focus: boolean): void {
        if (!focus && !this.rootElement) return;

        // @ts-ignore
        if (video.parentDocument !== doc || !this.isRealVideoPlayer(video)) return;

        let rootDom;
        if ('iframeElement' in doc) {
            const iframe = doc.iframeElement as HTMLElement;
            rootDom = this.rootElement ?? this.findVideoRootElement(iframe, [iframe.offsetWidth, iframe.offsetHeight]);
        } else {
            rootDom = this.rootElement ?? this.findVideoRootElement(video, [video.offsetWidth, video.offsetHeight]);
        }

        this.setRootElement(rootDom);

        rootDom.classList.add('video-roll-root');

        const { offsetWidth, offsetHeight } = rootDom;
        const rootStyle = document.getElementById("video-roll-root");

        if (rootStyle) {
            rootStyle.innerHTML = focus ? `.video-roll-root { position: fixed !important; top: 5% !important; z-index: 200001 !important; width: ${offsetWidth}px !important; height: ${offsetHeight}px !important; } body * { z-index: auto !important; } body { overflow: hidden !important; }` : '.video-roll-root {}';
        }
    }

    static createAudiohacker() {
        if (!this.audioCtx) return;

        for (const dom of this.videoElements) {
            const node = this.audioCtx.createMediaElementSource(dom as HTMLMediaElement);
            this.audioController.push(new Audiohacker(this.audioCtx, node));
        }
    }

    /**
     * update pitch
     * @returns 
     */
    static async updatePitch() {
        const { on, value } = this.rollConfig.pitch;

        try {
            if (!on && this.audioController.length) {
                // set to 0
                this.audioController.forEach((v) => {
                    v.setPitchOffset(value);
                })
                return this;
            };

            if (!on && !this.audioCtx) {
                return this;
            }

            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
                const { audioCtx } = this;

                if (audioCtx.state !== 'running') {
                    await audioCtx.resume();
                }

                this.createAudiohacker();
            }

            if (this.audioController.length && on) {
                this.audioController.forEach((v) => {
                    v.setPitchOffset(value);
                })
            }
        } catch (err) {
            console.debug(err);
        }

        return this;
    }

    /**
     * update volume
     * @returns 
     */
    static async updateVolume() {
        const volume = this.rollConfig.volume;

        try {
            if (volume !== 1 && !this.audioCtx) {
                this.audioCtx = new AudioContext();
                const { audioCtx } = this;

                if (audioCtx.state !== 'running') {
                    await audioCtx.resume();
                }
                this.createAudiohacker();
                return;
            }

            if (this.audioController.length) {
                this.audioController.forEach((v) => {
                    v.setVolume(volume);
                });
                return;
            }
        } catch (err) {
            console.debug(err);
        }
    }

    static updatePlaybackRate() {
        const playbackRate = this.rollConfig.playbackRate;

        try {
            for (const dom of this.videoElements) {
                (dom as HTMLMediaElement).playbackRate = playbackRate;
            }
        } catch (err) {
            console.debug(err);
        }
    }

    /**
     * HTMLVideoElement.requestPictureInPicture()
     */
    static togglePictureInPicture(pictureInPicture: boolean) {
        if (!pictureInPicture && document.pictureInPictureElement) {
            document.exitPictureInPicture();
            return;
        }

        try {
            if (pictureInPicture && document.pictureInPictureEnabled && this.realVideoPlayer.player) {
                this.realVideoPlayer.player.requestPictureInPicture();
            }
        } catch (err) { console.debug(err); }
    }

    static useVideoChanged(callback: Function) {
        const oldVideoNumbers = this.videoNumbers;
        const videoSelector = this.getVideoSelector(this.getHostName())
        this.updateDocuments().updateVideoNumbers(videoSelector);
        const changed = this.videoNumbers !== oldVideoNumbers;
        if (changed) {
            this.updateVideoElements(videoSelector);
            callback({
                text: String(this.videoNumbers),
                config: this.rollConfig,
            })
        }
    }

    /**
     * update video number
     * @param callback 
     */
    static observeVideo(callback: Function) {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.useVideoChanged(callback);

        try {
            const elementToObserve = document.querySelector("body") as Node;

            this.observer = new MutationObserver(() => {
                this.useVideoChanged(callback);
                // if (changed) {
                //     this.updateVideoElements(videoSelector);
                //     // this.rollConfig.videoList = this.videoElements.map((v) => {
                //     //     return {
                //     //         check: true,
                //     //         dataVideoId: (v as HTMLVideoElement).dataset.videoRollId,
                //     //         name: (v as HTMLVideoElement).dataset.videoRollId
                //     //     }
                //     // })
                    
                // }
            });

            this.observer.observe(elementToObserve, { childList: true });
        } catch (err) {
            console.debug(err);
        }

    }
}
