/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
import { createURL } from 'src/util';
import { ActionType } from '../types/type.d';
import { sendTabMessage, setBadge, getBrowser } from '../util';
import { useShortcuts } from 'src/use/useShortcuts';
import { useGeneralConfig } from 'src/options/use/useGeneralConfig';

let currentTabId: number | undefined;

function setupStorage() {
    // 检查并设置默认值
    chrome.storage.sync.get(['shortcuts', 'generalConfig'], (result) => {
        if (!result.shortcuts) {
            // 如果没有找到存储的值，就使用默认值
            const shortcutsMap = useShortcuts();
            chrome.storage.sync.set({
                shortcuts: JSON.parse(JSON.stringify(shortcutsMap.value))
            });
        }

        if (!result.generalConfig) {
            // 如果没有找到存储的值，就使用默认值
            const generalConfig = useGeneralConfig();
            chrome.storage.sync.set({
                generalConfig: JSON.parse(JSON.stringify(generalConfig.value))
            });
        }
    });
}


chrome.runtime.onInstalled.addListener((params: any) => {
    const reason = params.reason;

    switch (reason) {
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
    currentTabId = tabId;

    setupStorage();
    sendTabMessage(tabId, { type: ActionType.GET_BADGE, tabId }, (response: any) => {
        sendTabMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
    });
});

// when tab is changed and it means a tab is actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;

    setupStorage();
    sendTabMessage(tabId, { type: ActionType.GET_BADGE, tabId }, (response: any) => {
        sendTabMessage(tabId, { type: ActionType.INIT_SHORT_CUT_KEY });
    });
});

/**
 * update
 */
chrome.runtime.onMessage.addListener((a, b, send) => {
    if (typeof currentTabId !== 'number') return;

    const { rollConfig, type, text, tabId } = a;

    switch (type) {
        case ActionType.UPDATE_STORAGE:
            sendTabMessage(currentTabId, { rollConfig, type: ActionType.UPDATE_STORAGE, tabId });
            break;
        case ActionType.UPDATE_BADGE:
            setBadge(tabId, text);
            break;
        default:
            break;
    }

    send("update");
});
