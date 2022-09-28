/*
 * @description: types
 * @Author: Gouxinyu
 * @Date: 2022-09-06 23:44:14
 */
declare enum IActionType {
    ON_MOUNTED = 0,
    UPDATE_STORAGE,
    UPDATE_BADGE,
    UPDATE_CONFIG
}

declare enum IFlipType {
    unset = "",
    vertical = "rotate3d(1, 0, 0, 180deg)",
    horizontal = "rotate3d(0, 1, 0, 180deg)"
}

declare type IFlip = 'unset' | 'horizontal' | 'vertical'

declare interface IScale {
    mode: "auto" | 'custom',
    values: [number, number],
}

declare type IZoom = number;

declare type IDeg = number;

declare type IRollKey = keyof IRollConfig;

declare type IRollValue = IRollConfig[IRollKey];

declare interface IRollConfig {
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

declare interface IWebSite {
    [prop: string]: {
        name: string;
        videoSelector: any[]
    }
}