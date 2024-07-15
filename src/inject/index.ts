/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */
import { ActionType, VideoListItem } from '../types/type.d';
import { updateConfig, updateOnMounted, updateStorage, updateBadge, initKeyboardEvent, onHoverVideoElement, updateVideoCheck } from "./update";
import { sendRuntimeMessage } from "../util";
import VideoRoll from './VideoRoll';

(function () {
    let videoNumber: number = 0;
    /**
     * get message from popup or backgound
     */
    chrome.runtime.onMessage.addListener(async (data, b, send) => {
        const { rollConfig, tabId, type, id, isIn, ids } = data;

        try {
            switch (type) {
                case ActionType.GET_BADGE: {
                    updateBadge({
                        tabId,
                        rollConfig,
                        callback: ({ text, videoList }: { text: string, videoList: VideoListItem[] }) => {
                            videoNumber = Number(text);
                            sendRuntimeMessage(tabId, { text, type: ActionType.UPDATE_BADGE, videoList })
                        }
                    })
                    break;
                }
                // when popup onMounted, set init flip value to background,
                // through backgroundjs sending message to popup to store flip value
                case ActionType.ON_MOUNTED: {
                    updateOnMounted(tabId, { ...rollConfig, videoNumber });
                    break;
                }
                case ActionType.UPDATE_STORAGE:
                    updateStorage({ ...rollConfig, videoNumber }, send);
                    return;
                case ActionType.UPDATE_CONFIG: {
                    updateConfig(tabId, { ...rollConfig, videoNumber });
                    break;
                }
                case ActionType.INIT_SHORT_CUT_KEY:
                    initKeyboardEvent(tabId);
                    break;
                case ActionType.ON_HOVER_VIDEO: {
                    onHoverVideoElement(id, isIn);
                    break;
                }
                case ActionType.UPDATE_VIDEO_CHECK: {
                    updateVideoCheck(ids);
                    break;
                }
                default:
                    return;
            }

            send("rotate success");
        } catch (err) {
            console.debug(err);
        }
    });
})();
