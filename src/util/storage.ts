import { getDefaultConfig } from "../popup/content/use";
import { IRollConfig } from "../types/type";

export function getSessionStorage(tabId: number) {
    let data = JSON.parse(sessionStorage.getItem(`video-roll-${tabId}`) as string);

    if (!data) {
        data = getDefaultConfig();
        data.tabId = tabId;
        setSessionStorage(data);
    }

    return data;
}

export function getLocalStorage(url?: string) {
    return JSON.parse(localStorage.getItem(
        `video-roll-${url ?? window.location.href}`
    ) as string);
}

export function setSessionStorage(config: IRollConfig, newConfig?: IRollConfig) {
    if (!config.url) return;

    sessionStorage.setItem(
        `video-roll-${config.tabId}`,
        JSON.stringify(newConfig ?? config)
    );
}

export function setLocalStorage(config: IRollConfig) {
    localStorage.setItem(
        `video-roll-${config.url}`,
        JSON.stringify(config)
    );
}