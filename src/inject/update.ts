import VideoRoll from "./VideoRoll";
import { ActionType, IRollConfig } from '../types/type.d';
import { KEY_CODE } from "../types/type.d";
import { getSessionStorage, getLocalStorage, setSessionStorage, setLocalStorage } from "../util/storage";
import { getDefaultConfig } from "../popup/content/use/useConfig";

let KeyboardEventCache: Function | null = null;

const MAX_TIMES = 5;
const TIME = 230;

let times = 0;

/**
 * get badge text
 * @returns
 */
async function getTabBadge(): Promise<string> {
    const videoSelector = VideoRoll.getVideoSelector(VideoRoll.getHostName())
    VideoRoll.updateDocuments().updateVideoElements(videoSelector);

    if (times < MAX_TIMES) {
        times++;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getTabBadge());
            }, TIME);
        });   
    }
    return Promise.resolve(VideoRoll.videoNumbers > 0 ? String(VideoRoll.videoNumbers) : '');
}

/**
 * reset time
 */
function resetTimes() {
    times = 0;
}

/**
 * update rollConfig
 * @param rollConfig
 */
export function updateConfig(rollConfig: IRollConfig) {
    rollConfig.isInit = false;

    VideoRoll.updateVideo(rollConfig).updateAudio();

    const config = VideoRoll.getRollConfig();

    if (config.store) {
        setLocalStorage(rollConfig);
    } else {
        localStorage.removeItem(
            `video-roll-${rollConfig.url}`
        );
    }

    setSessionStorage(rollConfig, config);
}

/**
 * fired when open popup
 * @param rollConfig
 */
export function updateOnMounted(rollConfig: IRollConfig) {
    // set session storage
    let config = getLocalStorage(rollConfig.url);

    if (!config) {
        config = getSessionStorage(rollConfig.tabId);
    }

    if (!config) {
        config = rollConfig;
        setSessionStorage(config);

        if (rollConfig.store) {
            setLocalStorage(rollConfig);
        }
    }

    config = Object.assign(config, { videoNumber: rollConfig.videoNumber })

    VideoRoll.setRollConfig(config).addStyleClass().updateAudio();

    chrome.runtime.sendMessage(
        { rollConfig: config, type: ActionType.UPDATE_STORAGE },
        (res) => { console.debug(res); }
    );
}

/**
 * update badge
 * @param options
 */
export async function updateBadge(options: any) {
    const { tabId, rollConfig } = options;

    resetTimes();
    const text = await getTabBadge();

    const { config, tabConfig } = getStorageConfig(tabId);

    if (tabConfig) {
        if (!tabConfig.storeThisTab) {
            sessionStorage.removeItem(`video-roll-${tabId}`);
            tabConfig.store = false;
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updateAudio();
        } else {
            tabConfig.url = window.location.href;
            if (!config) tabConfig.store = false;
            sessionStorage.setItem(`video-roll-${tabId}`, JSON.stringify(tabConfig));
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updateAudio();
        }
    }

    if (config) {
        config.isInit = true;

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

    return Promise.resolve({ text });
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
export function getStorageConfig(tabId: number) {
    const config = getLocalStorage();

    // store this tab
    const tabConfig = getSessionStorage(tabId);

    return { config, tabConfig };
}

export function isCtrlOrCommand(e: KeyboardEvent) {
    return e.ctrlKey || (navigator.platform.indexOf('Mac') === 0 && e.metaKey);
}

export function keyDownEvent(tabId: number, e: KeyboardEvent) {
    const { config, tabConfig } = getStorageConfig(tabId);
    if (!config && !tabConfig) return;

    if (isCtrlOrCommand(e)) {
        let newConfig = tabConfig || config;

        const { code } = e;
        switch (code) {
            case KEY_CODE.UP:
                newConfig.deg = 0;
                break;
            case KEY_CODE.DOWN:
                newConfig.deg = 180;
                break;
            case KEY_CODE.RIGHT:
                newConfig.deg = 90;
                break;
            case KEY_CODE.LEFT:
                newConfig.deg = 270;
                break;
            case KEY_CODE.B:
                newConfig.focus.on = !newConfig.focus.on;
                break;
            default:
                return;
        }
        updateConfig(newConfig);
    }
}

export function initKeyboardEvent(tabId: number) {
    console.log(tabId, KeyboardEventCache);
    if (!KeyboardEventCache) {
        KeyboardEventCache = keyDownEvent.bind(null, tabId);
    }
    window.removeEventListener('keydown', KeyboardEventCache as EventListener);
    window.addEventListener('keydown', KeyboardEventCache as EventListener, { passive: true });
}
