/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */
import browser from 'webextension-polyfill';
import { ActionType } from '../types/type.d';
import { updateConfig, updateOnMounted, updateStorage, updateBadge, initKeyboardEvent } from "./update";
import { sendRuntimeMessage } from "../util";

(function () {
    let videoNumber: number = 0;
    /**
     * get message from popup or backgound
     */
    chrome.runtime.onMessage.addListener(async (data, b, send) => {
        const { rollConfig, tabId, type } = data;

        console.log('recive message', tabId);
        try {
            switch (type) {
                case ActionType.GET_BADGE: {
                    updateBadge({
                        tabId,
                        rollConfig
                    }).then((res) => {
                        videoNumber = Number(res?.text);
                        sendRuntimeMessage(tabId, { ...res, type: ActionType.UPDATE_BADGE })
                    });
                    break;
                }
                // when popup onMounted, set init flip value to background,
                // through backgroundjs sending message to popup to store flip value
                case ActionType.ON_MOUNTED: {
                    updateOnMounted({ ...rollConfig, videoNumber });
                    break;
                }
                case ActionType.UPDATE_STORAGE:
                    updateStorage({ ...rollConfig, videoNumber }, send);
                    return;
                case ActionType.UPDATE_CONFIG: {
                    updateConfig({ ...rollConfig, videoNumber });
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
