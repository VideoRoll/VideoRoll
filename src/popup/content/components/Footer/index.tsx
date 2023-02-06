/*
 * @description: Footer
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent } from "vue";
import {
    ChevronBackOutline,
    LogoGithub,
    Home,
    ThumbsUp,
} from "@vicons/ionicons5";
import "./index.less";

export default defineComponent({
    name: "Footer",
    setup() {
        const toGithub = () => {
            chrome.tabs.create({
                active: true,
                url: "https://github.com/gxy5202/VideoRoll",
            });
        };

        const toHome = () => {
            chrome.tabs.create({
                active: true,
                url: "https://gomi.site/VideoRoll",
            });
        };

        /**
         * 跳转到反馈
         */
        const toFeedBack = () => {
            chrome.tabs.create({
                active: true,
                url: "https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0",
            });
        };

        return () => (
            <div class="video-roll-footer">
                <div
                    class="video-roll-github"
                    onClick={toGithub}
                    title="star it!"
                >
                    <logo-github color="#ffffff"></logo-github>
                </div>

                <div class="video-roll-home" onClick={toHome} title="gomi.site">
                    <home class="home" color="#ffffff"></home>
                </div>

                <div
                    class="video-roll-thumbs-up"
                    onClick={toFeedBack}
                    title="thumbs up!"
                >
                    <thumbs-up class="thumbs-up" color="#ffffff"></thumbs-up>
                </div>
            </div>
        );
    },
    components: {
        ThumbsUp,
        Home,
        ChevronBackOutline,
        LogoGithub,
    },
});
