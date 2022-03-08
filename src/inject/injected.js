/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */
(function () {
    chrome.runtime.onMessage.addListener((a, b) => {
        console.log(a, b);
    });
})();