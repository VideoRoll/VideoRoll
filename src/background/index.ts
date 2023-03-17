/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
import { ActionType } from '../types/type.d';
import sendMessage from '../util/sendMessage';

let currentTabId: number;

chrome.action.setBadgeBackgroundColor({ color: "#a494c6" });

/**
 * when url has been changed, send a masseage to content.js
 * and update badge; 
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTabId = tabId;
    if (changeInfo.status !== 'complete') return;

    sendMessage(tabId, { type: ActionType.UPDATE_BADGE }, (response: any) => {
        if (
            !chrome.runtime.lastError &&
            typeof response === "object" &&
            "text" in response
        ) {
            chrome.action.setBadgeText({
                text: response.text,
                tabId,
            });

            chrome.action.setBadgeTextColor({
                color: '#fff',
                tabId,
            })
        }
    });
});

// when tab actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;

    sendMessage(tabId, { type: ActionType.UPDATE_BADGE }, (response: any) => {
        if (
            !chrome.runtime.lastError &&
            typeof response === "object" &&
            "text" in response
        ) {
            chrome.action.setBadgeText(
                {
                    text: response.text,
                    tabId,
                }
            );

            chrome.action.setBadgeTextColor({
                color: '#fff',
                tabId,
            })
        }
    });

    sendMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
});

/**
 * update storage
 */
chrome.runtime.onMessage.addListener((a, b, send) => {
    const { rollConfig, type } = a;

    if (type === ActionType.UPDATE_STORAGE) {
        sendMessage(currentTabId, { rollConfig, type: ActionType.UPDATE_STORAGE });
    }

    send("update");
});
