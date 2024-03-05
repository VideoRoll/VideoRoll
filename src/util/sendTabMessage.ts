import browser from "webextension-polyfill";

/**
 * send tab message
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