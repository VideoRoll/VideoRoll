export function setBadge(tabId: number, text: string) {
    chrome.action.setBadgeText(
        {
            text,
            tabId,
        }
    );

    chrome.action.setBadgeTextColor({
        color: '#fff',
        tabId,
    });
}