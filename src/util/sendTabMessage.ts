import browser from "webextension-polyfill";

/**
 * 这里需要解决并发导致同一个port被多次触发
 * @param tabId 
 * @param options 
 * @param callback 
 */
export function sendTabMessage(tabId: number, options: any, callback?: Function) {
    browser.tabs.sendMessage(tabId, { tabId, ...options }, {}).then((response) => {
        if (browser.runtime.lastError) {
            console.debug(browser.runtime.lastError.message);
        }

        if (typeof callback === 'function') {
            callback(response);
        }
    }).catch((err) => console.debug(err));
}