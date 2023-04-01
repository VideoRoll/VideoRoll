import browser from "webextension-polyfill";

type Browser = typeof chrome;
type API_KEYS = keyof Browser;
type API_VAKUES = Browser[API_KEYS];

interface IBrowserAPI {
    [key: string]: {
        [key: string]: keyof Browser;
    }
}

const API_REFRENCE: IBrowserAPI = {
    v2: {
        action: 'browserAction',
    },
    v3: {
        browserAction: 'action'
    }
}

/**
 * according to manifest_version, dynamically choose the right API
 * @param instance
 * @param key
 * @returns
 */
export function getBrowser(key: API_KEYS ): API_VAKUES {
    const json = chrome.runtime.getManifest();

    const version = `v${json.manifest_version}`;

    const type = API_REFRENCE[version]?.[key];

    if (type) {
        return chrome[type];
    }
        
    return chrome[key];
}