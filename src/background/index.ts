/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
import { ActionType } from '../types/type.d';

let currentTabId: number;

chrome.action.setBadgeBackgroundColor({ color: "#a494c6" });

/**
 * when url has been changed, send a masseage to content.js
 * and update badge; 
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTabId = tabId;
    if (changeInfo.status !== 'complete') return;

    function sendMessage() {
        chrome.tabs.sendMessage(tabId, { tabId, type: ActionType.UPDATE_BADGE }, {}, function (response) {
            if (
                !chrome.runtime.lastError &&
                typeof response === "object" &&
                "text" in response
            ) {
                chrome.action.setBadgeText(
                    {
                        text: response.text,
                        tabId: tabId,
                    },
                    () => { }
                );
            } else {
                setTimeout(sendMessage, 500)
            }
        });
    }

    sendMessage();
});

// when tab actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;

    function sendMessage() {
        chrome.tabs.sendMessage(tabId, { tabId, type: ActionType.UPDATE_BADGE }, {}, function (response) {
            if (
                !chrome.runtime.lastError &&
                typeof response === "object" &&
                "text" in response
            ) {
                chrome.action.setBadgeText(
                    {
                        text: response.text,
                        tabId,
                    },
                    () => { }
                );
            } else {
                setTimeout(sendMessage, 500);
            }
        });
    }

    sendMessage();
});

/**
 * shortcut key
 */
chrome.commands.onCommand.addListener((command) => {

    function sendMessage() {
        chrome.tabs.sendMessage(
            currentTabId,
            { rollConfig: { deg: Number(command) } },
            {},
            function (response) {
                if (chrome.runtime.lastError) {
                    setTimeout(sendMessage, 500);
                }
            }
        );
    }

    if (
        !chrome.runtime.lastError && currentTabId
    ) {
        sendMessage();
    } else { }
});

/**
 * update storage
 */
chrome.runtime.onMessage.addListener((a, b, send) => {
    const { rollConfig, type } = a;

    function sendMessage() {
        chrome.tabs.sendMessage(currentTabId, { rollConfig, type: ActionType.UPDATE_STORAGE }, {}, function () {
            if (chrome.runtime.lastError) {
                setTimeout(sendMessage, 1000);
            }
        });
    }

    if (type === ActionType.UPDATE_STORAGE) {
        sendMessage();
    }

    send("update");
});
