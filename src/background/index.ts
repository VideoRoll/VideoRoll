/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
import { createURL } from 'src/util';
import { ActionType } from '../types/type.d';
import { sendTabMessage, setBadge, getBrowser } from '../util';

let currentTabId: number | undefined;

chrome.runtime.onInstalled.addListener((params: any) => {
    const reason = params.reason;

    switch(reason) {
        case 'install':
            createURL('https://videoroll.gomi.site');
            break;
        case 'update':
            createURL('https://videoroll.gomi.site');
            break;
        case 'uninstall':
            createURL('https://videoroll.gomi.site');
            break;
        default:
            break;
    }
});

(getBrowser('action') as typeof chrome.action).setBadgeBackgroundColor({ color: "#a494c6" });

/**
 * when url has been changed, send a masseage to content.js
 * and update badge; 
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;

    currentTabId = tabId;

    sendTabMessage(tabId, { type: ActionType.GET_BADGE }, (response: any) => {
        sendTabMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
    });
});

// when tab is changed and it means a tab is actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;
});


/**
 * update
 */
chrome.runtime.onMessage.addListener((a, b, send) => {
    if (typeof currentTabId !== 'number') return;

    const { rollConfig, type, text, tabId } = a;

    switch (type) {
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
