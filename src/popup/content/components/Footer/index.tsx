/*
 * @description: Footer
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent } from "vue";
import {
    LogoGithub,
    Home,
    ThumbsUp,
} from "@vicons/ionicons5";
import { createURL } from '../../utils';
import "./index.less";

export default defineComponent({
    name: "Footer",
    setup() {
        const toGithub = () => {
            createURL('https://github.com/gxy5202/VideoRoll');
        };

        const toHome = () => {
            createURL('https://gomi.site/VideoRoll');
        };

        const toFeedBack = () => {
            createURL('https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm')
        };

        return () => (
            <div class="video-roll-footer">
                <div
                    class="video-roll-github"
                    onClick={toGithub}
                    title="star it!"
                >
                    <LogoGithub></LogoGithub>
                </div>

                <div class="video-roll-home" onClick={toHome} title="gomi.site">
                    <Home class="home"></Home>
                </div>

                <div
                    class="video-roll-thumbs-up"
                    onClick={toFeedBack}
                    title="thumbs up!"
                >
                    <ThumbsUp class="thumbs-up"></ThumbsUp>
                </div>
            </div>
        );
    }
});
