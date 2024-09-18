/*
 * @description: types
 * @Author: Gouxinyu
 * @Date: 2022-09-06 23:44:14
 */

export enum FilterUnit {
    blur = 'px',
    brightness = '',
    contrast = '%',
    grayscale = '%',
    'hue-rotate' = 'deg',
    invert = '%'
}

export enum ActionType {
    ON_MOUNTED = 0,
    UPDATE_STORAGE,
    UPDATE_BADGE,
    UPDATE_CONFIG,
    INIT_SHORT_CUT_KEY,
    GET_BADGE,
    UPDATE_VIDEO_LIST,
    ON_HOVER_VIDEO,
    UPDATE_VIDEO_CHECK,
    UPDATE_ENABLE,
    CAPTURE,
    MUTED,
    UPDATE_IFRAMES
}

export enum FlipType {
    unset = "",
    vertical = "rotate3d(1, 0, 0, 180deg)",
    horizontal = "rotate3d(0, 1, 0, 180deg)"
}

export type Flip = 'unset' | 'horizontal' | 'vertical'

export interface IMove {
    x: number;
    y: number;
}

export type VideoListItem = {
    checked?: boolean;
    id?: string;
    name?: string;
    visible?: boolean;
    visibleObserver?: IntersectionObserver;
    duration?: number;
    src?: string
    posterUrl?: string;
    isReal?: boolean;
}

export type Pitch = {
    on: boolean;
    value: number;
};

export type Vr = {
    on: boolean;
}

export interface IScale {
    mode: "auto" | 'custom',
    values: [number, number],
}

export interface IFilter {
    mode: 'unset' | 'custom',
    blur: number;
    brightness: number;
    contrast: number;
    grayscale: number;
    'hue-rotate': number;
    invert: number;
}

export type Zoom = number;

export type Deg = number;

export type Focus = {
    on: boolean;
    backgroundColor: string,
    blur: boolean,
    rounded: boolean
}

export type Document = {
    title?: string
}

export type Iframes = string[]

export type RollKey = keyof IRollConfig;

export type RollValue = IRollConfig[RollKey];

export interface IRollConfig {
    tabId: number;
    videoNumber: number;
    url: string;
    name: string;
    flip: Flip;
    scale: IScale;
    pitch: Pitch;
    volume: number;
    zoom: Zoom;
    playbackRate: number;
    focus: Focus;
    move: IMove;
    deg: Deg;
    filter: IFilter;
    pictureInPicture: boolean;
    storeThisTab: boolean;
    store: boolean;
    isInit: boolean;
    loop: boolean;
    muted: boolean;
    videoSelector: VideoSelector;
    isAutoChangeSize: boolean;
    enable: boolean;
    document: Document,
    iframes: Iframes,
    vr: Vr
    [key: string]: number | string | Vr | Iframes | Document | Flip | IFilter | IScale | Zoom | Deg | IMove | Pitch | Focus | boolean | VideoSelector
}

export type VideoSelector = {
    defaultDom: string;
    shadowDom?: string;
    wrapDom?: string
}

export type OriginElementPosition = {
    parentElement: HTMLElement
    previousElementSibling: HTMLElement | null
    nextElementSibling: HTMLElement | null
    style: {
        width?: number;
        height?: number;
    }
};

export type VideoElement = HTMLVideoElement;

export interface IWebSite {
    [prop: string]: {
        name: string;
        videoSelector: VideoSelector
    }
}

export enum KEY_CODE {
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    B = 'KeyB'
}

export interface IRealVideoPlayer {
    width: number;
    height: number;
    player: HTMLVideoElement | null;
}