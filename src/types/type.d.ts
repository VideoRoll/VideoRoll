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
    INIT_SHORT_CUT_KEY
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

export type Pitch = number;

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

export type RollKey = keyof IRollConfig;

export type RollValue = IRollConfig[RollKey];

export interface IRollConfig {
    tabId: number;
    url: string;
    name: string;
    flip: Flip;
    scale: IScale;
    pitch: Pitch;
    zoom: Zoom;
    move: IMove;
    deg: Deg;
    filter: IFilter;
    storeThisTab: boolean;
    store: boolean;
    isInit: boolean;
    videoSelector: string[];
    [key: string]: number | string | Flip | IFilter | IScale | Zoom | Deg | IMove | Pitch | boolean | string[]
}

export interface IWebSite {
    [prop: string]: {
        name: string;
        videoSelector: any[]
    }
}

export interface IVideoDom {
    dom: HTMLVideoElement | null;
    backupDom: HTMLVideoElement | HTMLElement | null;
}