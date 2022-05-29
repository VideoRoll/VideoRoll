/*
 * @description: webcomponents or shadowDom video element
 * Cause some websites' video player are made by shadowdom, we cant get it by video tag
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:57:14
 */
export default {
    "bilibili": {
        "name": "bilibili",
        // [originVideoElement, specialElement]
        // if originVideoElement cant get videoHieight or videoWifth, use specialElement
        "videoSelector": ["video", ["bwp-video", ".bilibili-player-popup-inner"]]
    },
    "pornhub": {
        "name": "pornhub",
        "videoSelector": [["video-element video", "video-element video"]]
    },
    "youtube": {
        "name": "youtube",
        "videoSelector": [[".html5-main-video", "video"]]
    }
}
