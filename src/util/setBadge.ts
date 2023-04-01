import { getBrowser } from "./getBrowser";

export function setBadge(tabId: number, text: string) {
    (getBrowser('action') as typeof chrome.action).setBadgeText(
        {
            text,
            tabId,
        }
    );
    
    // @types/chrome has a bug here
    (getBrowser('action') as any).setBadgeTextColor({
        color: '#fff',
        tabId,
    });
}