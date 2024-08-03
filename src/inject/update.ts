import VideoRoll from "./VideoRoll";
import browser from "webextension-polyfill";
import { ActionType, IRollConfig, VideoListItem } from '../types/type.d';
import { getSessionStorage, getLocalStorage, setSessionStorage, setLocalStorage, removeLocalStorage, setStorageByKey } from "../util/storage";
import { getDomain, sendRuntimeMessage } from "src/util";
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
    let config = await getLocalStorage(rollConfig.url);

    // set session storage
    if (!hasConfig(config)) {
        config = getSessionStorage(rollConfig.tabId);
    }

    const domain = getDomain(rollConfig.url);
    const key = `video-roll-disabled-${domain}`;
    const data = await browser.storage.sync.get(`video-roll-disabled-${domain}`)
    config = Object.assign(config, { videoNumber: rollConfig.videoNumber, tabId: rollConfig.tabId, enable: data[key] ? false : true })

    sendRuntimeMessage(tabId, { rollConfig: config, type: ActionType.UPDATE_STORAGE, tabId })
    if (config.enable === false) return;
    VideoRoll.setRollConfig(config).addStyleClass().updateAudio();
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

    const hasConf = hasConfig(config);

    if (tabConfig) {
        tabConfig.document = { title: document.title };
        if (!tabConfig.storeThisTab) {
            sessionStorage.removeItem(`video-roll-${tabId}`);
            tabConfig.store = false;
        } else {
            tabConfig.url = window.location.href;
            const domain = getDomain(tabConfig.url);
            const key = `video-roll-disabled-${domain}`;
            const data = await browser.storage.sync.get(key)
            if (data[key]) {
                tabConfig.enable = false;
                if (rollConfig) {
                    rollConfig.enable = false;
                }
            }

            if (!hasConf) tabConfig.store = false;
            sessionStorage.setItem(`video-roll-${tabId}`, JSON.stringify(tabConfig));
        }

        if (tabConfig.enable === false) return;

        VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updateAudio();
    }

    if (hasConf) {
        config.isInit = true;
        config.document = { title: document.title };

        const domain = getDomain(config.url);
        const key = `video-roll-disabled-${domain}`;
        const data = await browser.storage.sync.get(key)
        if (data[key]) config.enable = false;

        if (tabConfig?.storeThisTab) {
            config.storeThisTab = tabConfig.storeThisTab;
            setLocalStorage(config);
        }

        sessionStorage.setItem(
            `video-roll-${tabId}`,
            JSON.stringify(config)
        );

        if (config.enable === false) return;

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

export async function keyDownEvent(tabId: number, res: any, handler: any) {
    const { config, tabConfig } = await getStorageConfig(tabId);

    if (!hasConfig(config) && !tabConfig) return;
    const keys = Object.keys(shortcutsMap);

    let newConfig = tabConfig || config;
    for (const key of keys) {
        const item = (shortcutsMap as any)[key];
        const resItem = res[key];
        if (JSON.stringify(resItem.shortcuts?.code) === JSON.stringify(handler.keys)) {
            if (item.trigger) {
                item.trigger({
                    VideoRoll,
                    rollConfig: newConfig
                });
                return;
            }

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
    setStorageByKey(rollConfig).then(() => {
        const oldConfig = getSessionStorage(tabId);
        setSessionStorage(oldConfig, rollConfig);

        if (rollConfig.enable === false) {
            VideoRoll.stop();
            hotkeys.unbind('*');
        } else if (rollConfig.enable === true) {
            updateBadge({
                tabId,
                rollConfig,
                callback: ({ text, videoList }: { text: string, videoList: VideoListItem[] }) => {
                    // VideoRoll.addStyleClass().updateVideo(rollConfig).updateAudio();
                    sendRuntimeMessage(tabId, { text, type: ActionType.UPDATE_BADGE, videoList, tabId })
                }
            })
            initKeyboardEvent(tabId);
        }
    })
}

export function capture(tabId: number, rollConfig: IRollConfig) {
    const url = VideoRoll.capture();
    sendRuntimeMessage(tabId, { type: ActionType.CAPTURE, imgData: url })
}