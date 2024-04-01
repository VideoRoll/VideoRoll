export function createURL(url: string) {
    chrome.tabs.create({
        active: true,
        url
    });
}