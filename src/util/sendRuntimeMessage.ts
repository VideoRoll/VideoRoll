import browser from "webextension-polyfill";

/**
 * send runtime message
 * @param tabId 
 * @param options 
 * @param callback 
 */
export function sendRuntimeMessage(tabId: number, options: any, callback?: Function) {
    browser.runtime.sendMessage({ tabId, ...options }).then((response) => {
        if (browser.runtime.lastError) {
            console.debug(browser.runtime.lastError.message);
        }

        if (typeof callback === 'function') {
            callback(response);
        }
    }).catch((err) => console.debug(err));
}