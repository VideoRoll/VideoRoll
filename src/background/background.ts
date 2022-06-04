/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
let currentTabId = null;

chrome.action.setBadgeBackgroundColor({ color: "#a494c6" });

// when url changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTabId = tabId;
    chrome.tabs.sendMessage(tabId, { tabId }, {}, function (response) {
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
                () => {}
            );
        } else {
        }
    });
});

// when tab actived
chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    currentTabId = tabId;
    chrome.tabs.sendMessage(tabId, { tabId }, {}, function (response) {
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
                () => {}
            );
        } else {
        }
    });
});

// shortcut key
chrome.commands.onCommand.addListener((command) => {
    if (currentTabId) {
        chrome.tabs.sendMessage(
            currentTabId,
            { webInfo: { deg: Number(command) } },
            {},
            function (response) {
                if (chrome.runtime.lastError) {
                }
            }
        );
    }

    if (chrome.runtime.lastError) {
    }
});

// set flip
chrome.runtime.onMessage.addListener((a, b, c) => {
    const { flip } = a;
    if (flip) {
        chrome.tabs.sendMessage(currentTabId, { flip }, {}, function () {
            if (chrome.runtime.lastError) {
            }
        });
    }

    c("flip");
});
