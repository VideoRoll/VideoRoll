/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */

import { ActionType } from '../types/type.d';
import { updateConfig, updateOnMounted, updateStorage, updateBadge, initKeyboardEvent } from "./update";
import { sendRuntimeMessage } from "../util";

(function () {
    /**
     * get message from popup or backgound
     */
    chrome.runtime.onMessage.addListener(async (data, b, send) => {
        const { rollConfig, tabId, type } = data;

        try {
            switch (type) {
                case ActionType.GET_BADGE: {
                    updateBadge({
                        tabId,
                        rollConfig
                    }).then((res) => {
                        sendRuntimeMessage(tabId, { ...res, type: ActionType.UPDATE_BADGE })
                    });
                    break;
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
                    return;
            }

            send("rotate success");
        } catch (err) {
            console.debug(err);
        }
    });
})();
