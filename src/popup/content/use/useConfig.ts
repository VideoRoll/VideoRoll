/*
 * @description: useConfig
 * @Author: Gouxinyu
 * @Date: 2022-09-11 10:01:32
 */
import { reactive } from 'vue';
import { IRollConfig } from '../../../types/type';

const defaultConfig = {
    tabId: 0,
    url: '',
    name: '',
    flip: 'unset',
    scale: {
        mode: 'auto',
        values: [1, 1],
    },
    move: {
        x: 0,
        y: 0
    },
    pitch: 0,
    filter: {
        mode: 'unset',
        blur: 0,
        brightness: 1,
        contrast: 100,
        grayscale: 0,
        'hue-rotate': 0,
        invert: 0
    },
    zoom: 1,
    deg: 0,
    storeThisTab: true,
    store: false,
    isInit: false,
    videoSelector: { defaultDom: 'video' }
} as IRollConfig;

function getDefaultConfig() {
    return JSON.parse(JSON.stringify(defaultConfig));
}

function useConfig(): IRollConfig {
    const rollConfig = reactive<IRollConfig>(getDefaultConfig());

    return rollConfig;
}

export { useConfig, getDefaultConfig };