/*
 * @description: event Listener
 * @Author: Gouxinyu
 * @Date: 2022-04-23 23:37:22
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, { tabId }, {}, function (response) {
        if (typeof response === "object" && "text" in response) {
            chrome.action.setBadgeText(
                {
                    text: response.text,
                    tabId: tabId,
                },
                () => {}
            );
        }
    });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    chrome.tabs.sendMessage(tabId, { tabId }, {}, function (response) {
        if (typeof response === "object" && "text" in response) {
            chrome.action.setBadgeText(
                {
                    text: response.text,
                    tabId,
                },
                () => {}
            );
        }
    });
});
