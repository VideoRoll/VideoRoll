/**
 * 这里需要解决并发导致同一个port被多次触发
 * @param tabId 
 * @param options 
 * @param callback 
 */
export function sendTabMessage(tabId: number, options: any, callback?: Function) {
    chrome.tabs.sendMessage(tabId, { tabId, ...options }, {}).then((response) => {
        if (chrome.runtime.lastError) {
            console.debug(chrome.runtime.lastError.message);
        }

        if (typeof callback === 'function') {
            callback(response);
        }
    }).catch((err) => console.debug(err));
}