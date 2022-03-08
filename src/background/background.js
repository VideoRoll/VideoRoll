/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-03-07 23:14:00
 */
function setVideoRotate(item) {
    console.log(document, window.location);
}

chrome.runtime.onMessage.addListener((a, b) => {
    console.log(a, b);
    chrome.tabs.getCurrent((tab) => {
        console.log(tab);
        chrome.scripting.executeScript({
            target: { tabId: tab.tabId },
            function: setVideoRotate.bind(this, a)
        })
    })
}
)