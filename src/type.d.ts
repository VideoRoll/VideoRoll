/*
 * @description: types
 * @Author: Gouxinyu
 * @Date: 2022-09-06 23:44:14
 */
export enum IActionType {
    ON_MOUNTED = 0,
    UPDATE_STORAGE,
    UPDATE_BADGE,
    UPDATE_CONFIG
}

export enum IFlipType {
    unset = "",
    vertical = "rotate3d(1, 0, 0, 180deg)",
    horizontal = "rotate3d(0, 1, 0, 180deg)"
}

export type IFlip = 'unset' | 'horizental' | 'vertical'

export interface IScale {
    mode: "auto" | 'custom',
    values: [number, number],
}

export type IZoom = number;

export type IDeg = number;

export type IRollKey = keyof IRollConfig;

export type IRollValue = IRollConfig[IRollKey];

export interface IRollConfig {
    tabId: number;
    url: string;
    name: string;
    flip: IFlip;
    scale: IScale;
    zoom: IZoom;
    deg: IDeg;
    storeThisTab: boolean;
    store: boolean;
    isInit: boolean;
    videoSelector: string[];
    [key: string]: number | string | IFlip | IScale | IZoom | IDeg | boolean | string[]
}