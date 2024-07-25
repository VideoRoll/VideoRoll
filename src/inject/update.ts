import VideoRoll from "./VideoRoll";
import browser from "webextension-polyfill";
import { ActionType, IRollConfig, VideoListItem } from '../types/type.d';
import { getSessionStorage, getLocalStorage, setSessionStorage, setLocalStorage, removeLocalStorage } from "../util/storage";
import { sendRuntimeMessage } from "src/util";
import hotkeys from "hotkeys-js";
import { shortcutsMap } from "src/use/useShortcuts";

/**
 * get badge text
 * @returns
 */
async function getTabBadge(callback: Function) {
    VideoRoll.observeVideo(callback);
}

function hasConfig(config: any) {
    if (typeof config !== 'object') return false;

    return Reflect.ownKeys(config).length > 0;
}

async function getChromStore(key: string, defaultValue: any) {
    return browser.storage.sync.get(key).then((res) => {
        return res?.[key] ?? defaultValue;
    });
}

/**
 * update rollConfig
 * @param rollConfig
 */
export async function updateConfig(tabId: number, rollConfig: IRollConfig) {
    if (rollConfig.enable === false) return;

    rollConfig.isInit = false;

    const isAutoChangeSize = await getChromStore('isAutoChangeSize', true);

    rollConfig.isAutoChangeSize = isAutoChangeSize;

    VideoRoll.updateVideo(rollConfig).updateAudio();

    const config = VideoRoll.getRollConfig();

    if (config.store) {
        setLocalStorage(rollConfig);
    } else {
        removeLocalStorage(`video-roll-${rollConfig.url}`);
    }

    setSessionStorage(rollConfig, config);
}

/**
 * fired when open popup
 * @param rollConfig
 */
export async function updateOnMounted(tabId: number, rollConfig: IRollConfig) {
    if (rollConfig.enable === false) return;
    
    let config = await getLocalStorage(rollConfig.url);
    const isAutoChangeSize = await getChromStore('isAutoChangeSize', true);
    rollConfig.isAutoChangeSize = isAutoChangeSize;
    // set session storage
    if (!hasConfig(config)) {
        config = getSessionStorage(rollConfig.tabId);
    }

    config = Object.assign(config, { videoNumber: rollConfig.videoNumber, isAutoChangeSize, tabId: rollConfig.tabId })

    VideoRoll.setRollConfig(config).addStyleClass().updateAudio();

    sendRuntimeMessage(tabId, { rollConfig: config, type: ActionType.UPDATE_STORAGE, tabId })
    sendRuntimeMessage(tabId, { videoList: VideoRoll.videoList, type: ActionType.UPDATE_VIDEO_LIST, tabId })
}

/**
 * update badge
 * @param options
 */
export async function updateBadge(options: any) {
    const { tabId, rollConfig, callback } = options;

    getTabBadge(callback);

    const { config, tabConfig } = await getStorageConfig(tabId);

    const isAutoChangeSize = await getChromStore('isAutoChangeSize', true);

    const hasConf = hasConfig(config);

    if (tabConfig) {
        tabConfig.isAutoChangeSize = isAutoChangeSize;
        tabConfig.document = { title: document.title };
        if (!tabConfig.storeThisTab) {
            sessionStorage.removeItem(`video-roll-${tabId}`);
            tabConfig.store = false;
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updateAudio();
        } else {
            tabConfig.url = window.location.href;
            if (!hasConf) tabConfig.store = false;
            sessionStorage.setItem(`video-roll-${tabId}`, JSON.stringify(tabConfig));
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updateAudio();
        }
    }

    if (hasConf) {
        config.isInit = true;
        config.isAutoChangeSize = isAutoChangeSize;
        config.document = { title: document.title };
        if (tabConfig?.storeThisTab) {
            config.storeThisTab = tabConfig.storeThisTab;
            setLocalStorage(config);
        }

        sessionStorage.setItem(
            `video-roll-${tabId}`,
            JSON.stringify(config)
        );

        VideoRoll.setRollConfig(config).addStyleClass(true).updateVideo(rollConfig ?? config).updateAudio();
    }
}

export function updateStorage(rollConfig: IRollConfig, send: Function) {
    rollConfig.isInit = false;
    send("flip");
}

/**
 * get Storage
 * @param tabId
 * @returns 
 */
export async function getStorageConfig(tabId: number) {
    const config = await getLocalStorage();

    if (hasConfig(config)) {
        config.tabId = tabId;
    }

    // store this tab
    const tabConfig = getSessionStorage(tabId);

    return { config, tabConfig };
}

export function isCtrlOrCommand(e: KeyboardEvent) {
    return e.ctrlKey || (navigator.platform.indexOf('Mac') === 0 && e.metaKey);
}

export async function keyDownEvent(tabId: number, res: any, handler: any) {
    const { config, tabConfig } = await getStorageConfig(tabId);

    if (!hasConfig(config) && !tabConfig) return;
    const keys = Object.keys(shortcutsMap);

    let newConfig = tabConfig || config;
    for(const key of keys) {
        const item = (shortcutsMap as any)[key];
        const resItem = res[key];
        if (JSON.stringify(resItem.shortcuts?.code) === JSON.stringify(handler.keys)) {
            const data = item.handler(newConfig[item.key])
            newConfig[item.key] = data;
            updateConfig(tabId, newConfig);
            return;
        }
    }
}

export function initKeyboardEvent(tabId: number) {
    browser.storage.sync.get('shortcuts').then((res) => {
        const map = res?.['shortcuts'] ?? {};
        return map
    }).then((res) => {
        hotkeys.unbind('*');

        hotkeys('*', function (event, handler) {
            keyDownEvent(tabId, res, handler)
        });
    })
}

export function onHoverVideoElement(id: string, isIn: boolean) {

}

export function updateVideoCheck(ids: string[]) {
    VideoRoll.updateVideoCheck(ids);
}

export function updateEnable(tabId: number, rollConfig: IRollConfig) {
    if (rollConfig.enable === false) {
        VideoRoll.stop();
    } else if (rollConfig.enable === true){
        updateBadge({
            tabId,
            rollConfig,
            callback: ({ text, videoList }: { text: string, videoList: VideoListItem[] }) => {
                sendRuntimeMessage(tabId, { text, type: ActionType.UPDATE_BADGE, videoList, tabId })
            }
        })
    }
}

export function capture(tabId: number, rollConfig: IRollConfig) {
    const url = VideoRoll.capture();
    sendRuntimeMessage(tabId, { type: ActionType.CAPTURE, imgData: url })

}