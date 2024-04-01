type browser = typeof chrome;
type API_KEYS = keyof browser;
type API_VAKUES = browser[API_KEYS];

interface IBrowserAPI {
    [key: string]: {
        [key: string]: keyof browser;
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

export function getBrowserType(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") !== -1) return 'firefox';

    if (userAgent.indexOf("Chrome") !== -1) return 'chrome';

    if (userAgent.indexOf("Edg") !== -1) return 'edg';

    return 'chrome';
}