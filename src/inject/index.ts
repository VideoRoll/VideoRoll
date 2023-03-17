/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import VideoRoll from "./VideoRoll";
import { ActionType } from '../types/type.d';
import { updateConfig, updateOnMounted, updateStorage, updateBadge, initKeyboardEvent } from "./update";

/**
 * get badge text
 * @returns
 */
function getTabBadge(): string {
    const hostName = VideoRoll.getHostName();
    const videoSelector = VideoRoll.getVideoSelector(hostName);
    const { dom } = VideoRoll.getVideoDom(videoSelector, document);

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
                case ActionType.UPDATE_BADGE: {
                    updateBadge({
                        tabId,
                        rollConfig,
                        getTabBadge,
                        send
                    })
                    return;
                }
                // when popup onMounted, set init flip value to background,
                // through backgroundjs sending message to popup to store flip value
                case ActionType.ON_MOUNTED: {
                    updateOnMounted(rollConfig);
                    break;
                }
                case ActionType.UPDATE_STORAGE:
                    updateStorage(rollConfig, send);
                    return;
                case ActionType.UPDATE_CONFIG: {
                    updateConfig(rollConfig);
                    break;
                }
                case ActionType.INIT_SHORT_CUT_KEY:
                    initKeyboardEvent(tabId);
                    break;
                default:
                    break;
            }

            send("rotate success");
        } catch (err) {
            console.debug(err);
        }
    });
})();
