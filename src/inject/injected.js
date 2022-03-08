/*
 * @description: inject
 * @Author: Gouxinyu
 * @Date: 2022-01-11 23:49:59
 */
(function () {
    console.log('hhh!!!');
    chrome.runtime.onMessage.addListener((a, b) => {
        console.log(a, b);
    });
})();