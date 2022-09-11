/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import VideoRoll from "./VideoRoll";
import { IActionType } from "../type.d";

// let currentFlip = "unset";

/**
 * get badge text
 * @returns
 */
function getTabBadge(): string {
    const hostName = VideoRoll.getHostName();
    const videoSelector = VideoRoll.getVideoSelector(hostName);
    const dom = VideoRoll.getVideoDom(videoSelector, document);

    return dom ? "1" : "";
}

(function () {
    /**
     * get message from popup or backgound
     */
    chrome.runtime.onMessage.addListener((data, b, send) => {
        const { rollConfig, tabId, type } = data;
        try {
            switch (type) {
                case IActionType.UPDATE_BADGE: {
                    const text = getTabBadge();

                    const config = JSON.parse(localStorage.getItem(
                        `video-roll-${window.location.href}`
                    ) as string);

                    const tabConfig = JSON.parse(sessionStorage.getItem(`video-roll-${tabId}`) as string);

                    if (tabConfig) {
                        if (!tabConfig.storeThisTab) {
                            sessionStorage.removeItem(`video-roll-${tabId}`);
                            tabConfig.store = false;
                            VideoRoll.setRollConfig(tabConfig);
                            VideoRoll.addStyleClass(true);
                        } else {
                            tabConfig.url = window.location.href;
                            if (!config) tabConfig.store = false;
                            sessionStorage.setItem(`video-roll-${tabId}`, JSON.stringify(tabConfig));
                            VideoRoll.setRollConfig(tabConfig);
                            VideoRoll.addStyleClass(true);
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

                        VideoRoll.setRollConfig(config);
                        VideoRoll.addStyleClass(true);
                        VideoRoll.rotateVideo({
                            ...config,
                            videoSelector: config.videoSelector
                                ? config.videoSelector
                                : VideoRoll.getVideoSelector(
                                    VideoRoll.getHostName()
                                ),
                        });

                    }
                    send({ text });
                    return;
                }
                // when popup onMounted, set init flip value to background,
                // through backgroundjs sending message to popup to store flip value
                case IActionType.ON_MOUNTED: {
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

                    VideoRoll.setRollConfig(config);
                    VideoRoll.addStyleClass();

                    chrome.runtime.sendMessage(
                        { rollConfig: config, type: IActionType.UPDATE_STORAGE },
                        function (response) { }
                    );
                    break;
                }

                case IActionType.UPDATE_STORAGE:
                    rollConfig.isInit = false;
                    send("flip");
                    return;
                case IActionType.UPDATE_CONFIG: {
                    rollConfig.isInit = false;

                    VideoRoll.rotateVideo({
                        ...rollConfig,
                        videoSelector: rollConfig.videoSelector
                            ? rollConfig.videoSelector
                            : VideoRoll.getVideoSelector(
                                VideoRoll.getHostName()
                            ),
                    });

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

                    break;
                }

                default:
                    break;
            }

            send("rotate success");
        } catch (err) {
            console.debug(err);
        }
    });
})();
