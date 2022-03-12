/*
 * @description: 
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
    }
}
