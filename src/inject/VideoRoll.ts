/*
 * @description: VideoRoll class
 * @Author: Gouxinyu
 * @Date: 2022-05-31 23:27:36
 */
import WEBSITE from "../website";
import Audiohacker from "audio-hacker";
import * as THREE from 'three';
import { Flip, IMove, IFilter, Focus, FilterUnit, IRollConfig, FlipType, VideoSelector, VideoElement, OriginElementPosition, IRealVideoPlayer, VideoListItem, ActionType } from '../types/type.d';
import { nanoid } from "nanoid";
import { isVisible, sendRuntimeMessage } from "src/util";
import debounce from "src/util/debounce";
import { getName } from "./utils/getName";

export default class VideoRoll {
    static rollConfig: IRollConfig;

    static audioCtx: AudioContext | null = null;

    static audioController: Audiohacker[] = [];

    static videoElements: Set<HTMLVideoElement> = new Set();

    static documents: Document[] = [];

    static videoNumbers: number = 0;

    static videoList: VideoListItem[] = [];

    static realVideoPlayer: IRealVideoPlayer = { width: 0, height: 0, player: null };

    static originElementPosition: OriginElementPosition | null;

    static observer: MutationObserver | null;

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
        target: HTMLVideoElement,
        deg: number
    ): [number, number] {
        const offsetWidth = target.offsetWidth ?? 0;
        const offsetHeight = target.offsetHeight ?? 0;
        const videoWidth = target.videoWidth ?? 0;
        const videoHeight = target.videoHeight ?? 0;

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
            return Number.isNaN(value) ? [1, 1] : [value, value];
        }

        if (!isHorizonDeg && isHorizonVideo && isHorizonDom) {
            return [1, 1];
        }

        // 若是竖屏且容器为竖屏
        if (!isHorizonVideo && !isHorizonDom && isHorizonDeg) {
            const value = videoWidth / videoHeight;
            return Number.isNaN(value) ? [1, 1] : [value, value];
        }

        return [1, 1];
    }

    /**
     * get all documnets includes iframes
     */
    static updateDocuments() {
        const iframes = document.querySelectorAll("iframe") ?? [];
        const iframeEls: HTMLIFrameElement[] = Array.from(iframes).filter((v) => v.contentDocument);

        this.setRollConfig({
            ...this.rollConfig,
            iframes: Array.from(iframes).map((v) => v.src)
        })

        this.documents = [document, ...(iframeEls.map((v) => {
            if (v.contentDocument) {
                // @ts-ignore
                v.contentDocument.iframeElement = v;
            }
            return v.contentDocument as Document;
        }).filter((v) => v.querySelectorAll('video').length > 0))];

        return this;
    }

    /**
     * get all video elements
     */
    static updateVideoElements(videoSelector: VideoSelector) {
        if (!this.documents.length) return;

        this.addMaskElement();
        this.addVrMaskElement();
        // this.clearOriginElementPosition();
        this.clearRealVideoPlayer();

        const videos = this.getAllVideosBySelector(videoSelector, this.documents);

        this.setVideo(videos);

        const mask = document.getElementById('video-roll-root-mask');
        if (!this.realVideoPlayer.player || this.realVideoPlayer.player?.parentElement === mask) return;

        const originElementPosition = this.findOriginElementPosition(this.realVideoPlayer.player as HTMLVideoElement);
        this.setOriginElementPosition(originElementPosition);
        return this;
    }

    static updateVideoNumbers(videoSelector: VideoSelector) {
        if (!this.documents.length) return;

        const videos = this.getAllVideosBySelector(videoSelector, this.documents);

        this.setVideo(videos);
        return this;
    }

    static getSourceElementSrc(video: HTMLVideoElement) {
        if (!video.src) {
            // twitch has no src
            const src = video.querySelector('source')?.src ?? 'no-src';
            return src;
        }
        return video.src;
    }

    static getAllVideosBySelector(videoSelector: VideoSelector, docs: Document[] | HTMLIFrameElement[]): HTMLVideoElement[] {
        const { defaultDom } = videoSelector;
        const videos: HTMLVideoElement[] = [];
        if (defaultDom) {
            docs.forEach((doc) => {
                const defaultElements: NodeListOf<HTMLVideoElement> = doc.querySelectorAll(defaultDom);
                const elements = Array.from(defaultElements).filter((element) => this.getSourceElementSrc(element));

                for (const video of elements) {
                    // @ts-ignore
                    video.parentDocument = doc;

                    if (video.dataset.rollId) {
                        continue;
                    };

                    video.setAttribute("data-roll-id", `${nanoid()}`);
                    video.setAttribute("data-roll-check", "true");
                }

                videos.push(...elements);
            })
        }

        return videos;
    }

    /**
     * set videoElements
     * @param videoSelector 
     * @param doc 
     * @returns 
     */
    static setVideo(videos: HTMLVideoElement[]) {
        this.videoElements.forEach((item) => {
            // @ts-ignore
            if (!videos.some((v) => v === item)) {
                this.videoElements.delete(item);
            }
        })

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];

            if (i === 0) {
                this.setRealVideoPlayer(video);
            } else if (this.isRealVideoPlayer(video)) {
                this.setRealVideoPlayer(video);
            }

            if (this.videoElements.has(video)) continue;

            this.videoElements.add(video);
        }

        this.setVideoNumbers();
    }

    static setVideoNumbers(): void {
        this.videoNumbers = this.videoElements.size;
    }

    static setOriginElementPosition(data: any) {
        this.originElementPosition = data;
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
        this.videoElements.clear();
    }

    static clearOriginElementPosition() {
        this.originElementPosition = null;
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

        if (player.loop && isSmaller) return false;

        if (isSmaller) return false;

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

        const videos = this.videoElements.values();
        for (const target of videos) {
            if (target.dataset.rollCheck === 'false') {
                target.classList.remove("video-roll-deg-scale");
                target.setAttribute("data-roll", "false");
                this.toggleLoop(target, false);
                continue;
            };

            const dom = target;

            let scaleNum: [number, number] = [1, 1];

            if (rollConfig.isAutoChangeSize) {
                scaleNum = this.rollConfig.isInit || scale.mode === 'custom' ? scale.values : this.getScaleNumber(target, deg);
            }

            this.rollConfig.scale.values = scaleNum;
            this.rollConfig.document = { title: document.title };
            this.documents.forEach((doc) => {
                if (!this.isExistStyle(doc)) return;
                this.replaceClass({ deg, flip, scale: scaleNum, zoom, move, filter, focus }, doc);
            });

            dom.classList.add("video-roll-deg-scale");
            dom.setAttribute("data-roll", "true");

            this.toggleLoop(dom, rollConfig.loop);
        }

        this.updateFocus(this.realVideoPlayer.player as HTMLVideoElement, focus);
        this.togglePictureInPicture(pictureInPicture);

        return this;
    }

    /**
     * update audio
     */
    static async updateAudio() {
        await this.updatePitch();
        await this.updateVolume();
        this.updatePlaybackRate();
        this.toggleMuted();
        return this;
    }

    static toggleMuted() {
        sendRuntimeMessage(this.rollConfig.tabId, { type: ActionType.MUTED, muted: this.rollConfig.muted })
    }

    static resetAudio() {
        this.audioController.forEach((v) => {
            v.setPitchOffset(0);
            v.setVolume(1);
        })
        this.videoElements.forEach((video) => {
            (video as HTMLMediaElement).playbackRate = 1;
        })
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
        `;

        return this;
    }

    /**
     * 是否存在class
     * @returns
     */
    static isExistStyle(doc: Document) {
        const degScale = doc.getElementById("video-roll-deg-scale");

        return degScale ?? null;
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
                    styles.innerHTML = `
                    .video-roll-deg-scale {}
                `;
                    return this;
                }

                return this;
            }

            const degScale = doc.createElement("style");
            degScale.innerHTML = `
                .video-roll-deg-scale {}
            `;

            degScale.setAttribute("id", "video-roll-deg-scale");
            degScale.setAttribute("type", "text/css");

            const focusStyle = doc.createElement("style");
            focusStyle.innerHTML = ``;
            focusStyle.setAttribute("id", "video-roll-focus-style");
            focusStyle.setAttribute("type", "text/css");

            const vrStyle = doc.createElement("style");
            vrStyle.innerHTML = ``;
            vrStyle.setAttribute("id", "video-roll-vr-style");
            vrStyle.setAttribute("type", "text/css");

            const head = doc.getElementsByTagName("head")[0];

            if (head) {
                head.appendChild(degScale);
                head.appendChild(focusStyle);
                head.appendChild(vrStyle);
            }

            this.addMaskElement();
            this.addVrMaskElement();
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
        if (!document.body) return;

        if (!document.getElementById('video-roll-root-mask')) {
            const mask = document.createElement("div");
            mask.setAttribute("id", "video-roll-root-mask");
            document.body.appendChild(mask);
        }
    }

    static addVrMaskElement() {
        if (!document.body) return;

        if (!document.getElementById('video-roll-vr-mask')) {
            const mask = document.createElement("div");
            mask.setAttribute("id", "video-roll-vr-mask");
            document.body.appendChild(mask);
        }
    }

    /**
     * find the video's root wrapper element
     * @param dom
     * @param rect
     * @returns
     */
    static findOriginElementPosition(video: HTMLVideoElement): any {
        const { parentElement, previousElementSibling, nextElementSibling } = video;
        return {
            parentElement,
            previousElementSibling,
            nextElementSibling,
            style: {
                width: video.offsetWidth,
                height: video.offsetHeight
            }
        }
    }

    /**
     * update focus mode
     * @param doc
     * @param video 
     * @param focus
     * @returns
     */
    static updateFocus(video: HTMLVideoElement, focus: Focus) {
        const mask = document.getElementById('video-roll-root-mask');
        const focusStyle = document.getElementById('video-roll-focus-style') as HTMLStyleElement;

        if (focusStyle) {
            focusStyle.innerHTML = `#video-roll-root-mask {
                display: ${focus.on ? 'block' : 'none'};
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                backdrop-filter: ${focus.blur ? 'blur(10px)' : 'unset'};
                z-index: 20000 !important;
                background-color: ${focus.backgroundColor};
            }
            
            .video-roll-focus {
                width: ${this.originElementPosition?.style.width}px;
                height: ${this.originElementPosition?.style.height}px;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: ${focus.rounded ? '10px' : 'unset'}
            }`
        }

        if (!video) return this;

        if (!focus.on && this.originElementPosition && mask) {
            const { parentElement, nextElementSibling } = this.originElementPosition;
            if (video.parentElement === mask && parentElement) {
                video.classList.remove('video-roll-focus');
                if (video.classList.contains('video-roll-no-controls')) {
                    video.classList.remove('video-roll-no-controls');
                    video.controls = false;
                }

                if (nextElementSibling) {
                    parentElement.insertBefore(video, nextElementSibling)
                } else {
                    parentElement.appendChild(video);
                }
            }

            return this;
        }

        if (focus.on && this.originElementPosition && mask) {
            mask.appendChild(video);
            video.classList.add('video-roll-focus');

            if (!video.controls) {
                video.classList.add('video-roll-no-controls');
                video.controls = true;
            }
        }

        return this;
    }

    static updateVr() {
        // Initialize Three.js scene
        let scene, camera, renderer, sphere, videoTexture, video;
        let lon = 0, lat = 0;
        let phi = 0, theta = 0;
        let isUserInteracting = false;
        let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
        let onPointerDownLon = 0, onPointerDownLat = 0;

        function init() {
            // Get video element and canvas
            video = document.getElementById('vrVideo');
            const canvas = document.getElementById('vrCanvas');

            // Create Three.js renderer
            renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Create scene and camera
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
            camera.target = new THREE.Vector3(0, 0, 0);

            // Create video texture
            videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBFormat;

            // Create a sphere geometry and map video as texture
            const geometry = new THREE.SphereGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1); // Invert sphere geometry to view from inside
            const material = new THREE.MeshBasicMaterial({ map: videoTexture });
            sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            // Add event listeners for mouse and touch controls
            document.addEventListener('mousedown', onPointerDown, false);
            document.addEventListener('mousemove', onPointerMove, false);
            document.addEventListener('mouseup', onPointerUp, false);

            document.addEventListener('touchstart', onPointerDown, false);
            document.addEventListener('touchmove', onPointerMove, false);
            document.addEventListener('touchend', onPointerUp, false);

            // Resize canvas when window resizes
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onPointerDown(event) {
            isUserInteracting = true;

            const clientX = event.clientX || event.touches[0].clientX;
            const clientY = event.clientY || event.touches[0].clientY;

            onPointerDownPointerX = clientX;
            onPointerDownPointerY = clientY;

            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }

        function onPointerMove(event) {
            if (isUserInteracting) {
                const clientX = event.clientX || event.touches[0].clientX;
                const clientY = event.clientY || event.touches[0].clientY;

                lon = (onPointerDownPointerX - clientX) * 0.1 + onPointerDownLon;
                lat = (clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
            }
        }

        function onPointerUp() {
            isUserInteracting = false;
        }

        function animate() {
            requestAnimationFrame(animate);

            lat = Math.max(-85, Math.min(85, lat));
            phi = THREE.MathUtils.degToRad(90 - lat);
            theta = THREE.MathUtils.degToRad(lon);

            camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
            camera.target.y = 500 * Math.cos(phi);
            camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(camera.target);

            // Render the scene
            renderer.render(scene, camera);
        }

        // Initialize and start animation
        init();
        animate();
    }

    static createAudiohacker() {
        const audioCtx = this.audioCtx as AudioContext;
        if (!audioCtx) return;

        this.videoElements.forEach((video) => {
            const node = audioCtx.createMediaElementSource(video as HTMLMediaElement);
            this.audioController.push(new Audiohacker(audioCtx, node));
        });
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
            this.videoElements.forEach((video) => {
                (video as HTMLMediaElement).playbackRate = playbackRate;
            })
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

    static toggleLoop(video: HTMLVideoElement, loop: boolean) {
        video.loop = loop;
    }

    static buildVideoList() {
        return this.videoList.map((v) => ({
            name: v.name,
            id: v.id,
            visible: v.visible,
            checked: v.checked,
            posterUrl: v.posterUrl,
            duration: v.duration,
            isReal: v.isReal
        }))
    }

    static getVideoVisibleObserver(video: HTMLVideoElement, item: any, callback: Function) {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                video.setAttribute('data-roll-visible', 'false');
                item.visible = isVisible(video);

                callback({
                    text: String(this.videoNumbers),
                    videoList: this.buildVideoList()
                })
                return;
            }

            video.setAttribute('data-roll-visible', 'true');
            item.visible = isVisible(video);
            callback({
                text: String(this.videoNumbers),
                videoList: this.buildVideoList()
            })
        });

        intersectionObserver.observe(video);

        return intersectionObserver;
    }

    static capture(video = this.realVideoPlayer.player): Promise<any> {
        const rect = (video as HTMLVideoElement).getBoundingClientRect();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = rect.width;
        canvas.height = rect.height;

        context?.drawImage((video as HTMLVideoElement), 0, 0, canvas.width, canvas.height);
        // 获取canvas内容作为图像
        return Promise.resolve(canvas.toDataURL('image/png'));
    }

    static getVideoInfo(video: HTMLVideoElement, index: number) {
        const src = this.getSourceElementSrc(video);
        const time = Math.ceil(video.duration * 10 / 60) / 10;
        const duration = isNaN(time) ? 0 : time;
        if (this.rollConfig.crossorigin) {
            video.setAttribute('crossorigin', 'anonymous');
        }
        let dataURL = '';
        let name = `video ${index + 1}`;
        const isReal = this.realVideoPlayer.player === video;
        try {
            const url = new URL(src);
            name = getName(url);
            return this.capture(video).then((dataURL: string) => {
                return {
                    posterUrl: dataURL,
                    duration,
                    name,
                    isReal
                }
            });
        } catch (err) {
            console.debug(err);
            return Promise.resolve({
                posterUrl: dataURL,
                duration,
                name,
                isReal
            })
        }

    }

    static async useVideoChanged(callback: Function) {
        const videoSelector = this.getVideoSelector(this.getHostName())
        this.updateDocuments().updateVideoElements(videoSelector);

        const videos = [...this.videoElements];
        const infos = await Promise.all(videos.map((v, index) => this.getVideoInfo(v, index)))

        this.videoList = videos.map((v, index) => {
            const item: any = {
                id: v.dataset.rollId,
                visible: v.dataset.rollVisible === 'true' ? true : false,
                checked: v.dataset.rollCheck === 'true' ? true : false,
                ...infos[index]
            };

            // item.visibleObserver = this.getVideoVisibleObserver(v, item, callback)

            return item
        });

        callback({
            text: String(this.videoNumbers),
            videoList: this.buildVideoList()
        })
    }

    /**
     * update video number
     * @param callback 
     */
    static observeVideo(callback: Function) {
        if (this.rollConfig?.enable === false) return this;

        this.useVideoChanged(callback);

        try {
            const elementToObserve = document.querySelector("body") as Node;
            if (!elementToObserve) return this;

            if (!this.observer) {
                this.observer = new MutationObserver(debounce((mutationList: any) => {
                    this.useVideoChanged(callback);
                }, 300));

                this.observer.observe(elementToObserve, { childList: true, subtree: true, attributes: true });
            }
        } catch (err) {
            console.debug(err);
        }

        return this;
    }

    static updateVideoCheck(ids: any[]) {
        const elements = Array.from(this.videoElements);
        this.videoList.forEach(v => {
            const video = elements.find(x => x.dataset.rollId === v.id);
            if (video) {
                video.dataset.rollCheck = ids.includes(video.dataset.rollId) ? 'true' : 'false';
            }
        });

        this.videoList = this.videoList.map((v: any, index) => {
            v.checked = ids.includes(v.id);
            return v;
        });

        this.updateVideo(this.rollConfig);
        return this;
    }

    static removeStyle(target: HTMLElement) {
        target.classList.remove("video-roll-highlight");
        target.classList.remove("video-roll-deg-scale");
        target.classList.remove("video-roll-focus");

        document.getElementById('video-roll-deg-scale')?.remove();
        document.getElementById('video-roll-focus-style')?.remove();
    }

    static stop() {
        this.videoElements.forEach((v) => {
            this.removeStyle(v);
        });
        this.resetAudio();

        if (this.rollConfig.focus.on) {
            this.updateFocus(this.realVideoPlayer.player as HTMLVideoElement, { on: false } as Focus);
            const mask = document.getElementById('video-roll-root-mask') as HTMLElement;
            mask?.remove();
        }

        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        if (this.rollConfig.pictureInPicture) {
            this.togglePictureInPicture(false);
        }

        this.clearRealVideoPlayer();
        this.clearOriginElementPosition();
        this.clearVideoElements();
        this.documents = [];
        this.videoNumbers = 0;
        this.videoList = [];
    }

    static restart() {

    }
}
