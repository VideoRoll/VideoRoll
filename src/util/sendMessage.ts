export default function sendMessage(tabId: number, options: any, callback?: Function) {
    chrome.tabs.sendMessage(tabId, { tabId, ...options }, {}, (response) => {
        if (chrome.runtime.lastError) {
            setTimeout(() => sendMessage(tabId, { tabId, ...options }, callback), 500);
        } else if (typeof callback === 'function') {
            callback(response);
        }
    })
}