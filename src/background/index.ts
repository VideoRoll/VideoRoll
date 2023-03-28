/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
import { ActionType } from '../types/type.d';
import { sendTabMessage, setBadge } from '../util';

let currentTabId: number;

chrome.action.setBadgeBackgroundColor({ color: "#a494c6" });

/**
 * when url has been changed, send a masseage to content.js
 * and update badge; 
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTabId = tabId;
    if (changeInfo.status !== 'complete') return;

    sendTabMessage(tabId, { type: ActionType.GET_BADGE }, (response: any) => {
        sendTabMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
    });
});

// when tab actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;

    sendTabMessage(tabId, { type: ActionType.GET_BADGE }, (response: any) => {
        sendTabMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
    });
});


/**
 * update storage
 */
chrome.runtime.onMessage.addListener((a, b, send) => {
    const { rollConfig, type, text, tabId } = a;

    switch(type) {
        case ActionType.UPDATE_STORAGE:
            sendTabMessage(currentTabId, { rollConfig, type: ActionType.UPDATE_STORAGE });
            break;
        case ActionType.UPDATE_BADGE:
            setBadge(tabId, text);
            break;
        default:
            break;
    }

    send("update");
});
