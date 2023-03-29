/*
 * @description: webcomponents or shadowDom video element
 * Cause some websites' video player are made by shadowdom, we cant get it by video tag
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:57:14
 */
import type { IWebSite } from './types/type.d';
const WEBSITE: IWebSite = {
    "bilibili": {
        "name": "bilibili",
        // [originVideoElement, specialElement]
        // if originVideoElement can't get videoHieight or videoWifth, use specialElement
        "videoSelector": {
            defaultDom: 'video',
            shadowDom: 'bwp-video',
            wrapDom: '.bpx-player-video-wrap'
        }
    }
}

export default WEBSITE;
