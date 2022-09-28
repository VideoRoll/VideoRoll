/*
 * @description: useConfig
 * @Author: Gouxinyu
 * @Date: 2022-09-11 10:01:32
 */
import { reactive } from 'vue';

function useConfig(): IRollConfig {
    const rollConfig = reactive<IRollConfig>({
        tabId: 0,
        url: '',
        name: '',
        flip: 'unset',
        scale: {
            mode: 'auto',
            values: [1, 1],
        },
        zoom: 1,
        deg: 0,
        storeThisTab: false,
        store: false,
        isInit: false,
        videoSelector: [],
    });

    return rollConfig;
}

export { useConfig };