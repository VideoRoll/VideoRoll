import VideoRoll from "./VideoRoll";
import { ActionType, IRollConfig } from '../types/type.d';

/**
 * update rollConfig
 * @param rollConfig
 */
export function updateConfig(rollConfig: IRollConfig) {
    rollConfig.isInit = false;

    const videoSelector = rollConfig.videoSelector
        ? rollConfig.videoSelector
        : VideoRoll.getVideoSelector(
            VideoRoll.getHostName()
        );

    VideoRoll.updateVideo({
        ...rollConfig,
        videoSelector
    }).updatePitch();

    const config = VideoRoll.getRollConfig();

    if (config.store) {
        localStorage.setItem(
            `video-roll-${rollConfig.url}`,
            JSON.stringify(config)
        );
    } else {
        localStorage.removeItem(
            `video-roll-${rollConfig.url}`
        );
    }

    sessionStorage.setItem(
        `video-roll-${rollConfig.tabId}`,
        JSON.stringify(config)
    );
}

export function updateOnMounted(rollConfig: IRollConfig) {
    // set session storage
    let config = JSON.parse(localStorage.getItem(
        `video-roll-${rollConfig.url}`
    ) as string);

    if (!config) {
        config = JSON.parse(sessionStorage.getItem(`video-roll-${rollConfig.tabId}`) as string);
    }

    if (!config) {
        config = rollConfig;
        sessionStorage.setItem(
            `video-roll-${config.tabId}`,
            JSON.stringify(config)
        );

        if (rollConfig.store) {
            localStorage.setItem(
                `video-roll-${config.url}`,
                JSON.stringify(config)
            );
        }
    }

    VideoRoll.setRollConfig(config).addStyleClass().updatePitch();

    chrome.runtime.sendMessage(
        { rollConfig: config, type: ActionType.UPDATE_STORAGE },
        function (response) { }
    );
}

/**
 * update badge
 * @param options
 */
export function updateBadge(options: any) {
    const { getTabBadge, tabId, rollConfig, send } = options;

    const text = getTabBadge();

    // store this url
    const config = JSON.parse(localStorage.getItem(
        `video-roll-${window.location.href}`
    ) as string);

    // store this tab
    const tabConfig = JSON.parse(sessionStorage.getItem(`video-roll-${tabId}`) as string);

    if (tabConfig) {
        if (!tabConfig.storeThisTab) {
            sessionStorage.removeItem(`video-roll-${tabId}`);
            tabConfig.store = false;
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updatePitch();
        } else {
            tabConfig.url = window.location.href;
            if (!config) tabConfig.store = false;
            sessionStorage.setItem(`video-roll-${tabId}`, JSON.stringify(tabConfig));
            VideoRoll.setRollConfig(tabConfig).addStyleClass(true).updatePitch();
        }
    }

    if (config) {
        config.isInit = true;

        if (tabConfig?.storeThisTab) {
            config.storeThisTab = tabConfig.storeThisTab;
            localStorage.setItem(
                `video-roll-${config.url}`,
                JSON.stringify(config)
            );
        }

        sessionStorage.setItem(
            `video-roll-${tabId}`,
            JSON.stringify(config)
        );

        const videoSelector = rollConfig.videoSelector
            ? rollConfig.videoSelector
            : VideoRoll.getVideoSelector(
                VideoRoll.getHostName()
            );
        VideoRoll.setRollConfig(config).addStyleClass(true).updateVideo({
            ...config,
            videoSelector
        }).updatePitch();

    }
    send({ text });
}

export function updateStorage(rollConfig: IRollConfig, send: Function) {
    rollConfig.isInit = false;
    send("flip");
}

export function initKeyboardEvent(tabId: number) {
    const KEY_CODE = {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'
    };

    function isCtrlOrCommand(e: KeyboardEvent) {
        return e.ctrlKey || (navigator.platform.indexOf('Mac') === 0 && e.metaKey);
    }

    (function (CODE, id) {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (isCtrlOrCommand(e)) {
                // store this url
                const config = JSON.parse(localStorage.getItem(
                    `video-roll-${window.location.href}`
                ) as string);

                // store this tab
                const tabConfig = JSON.parse(sessionStorage.getItem(`video-roll-${id}`) as string);
                
                console.log(tabConfig, config, `video-roll-${id}`, e.code);
                if (!config && !tabConfig) return;
                
                let newConfig = tabConfig || config;

                const { code } = e;
                switch (code) {
                    case CODE.UP:
                        newConfig.deg = 0;
                        break;
                    case CODE.DOWN:
                        newConfig.deg = 180;
                        break;
                    case CODE.RIGHT:
                        newConfig.deg = 90;
                        break;
                    case CODE.LEFT:
                        newConfig.deg = 270;
                        break;
                    default:
                        break;
                }
                updateConfig(newConfig);
            }
        });
    })(KEY_CODE, tabId)
}