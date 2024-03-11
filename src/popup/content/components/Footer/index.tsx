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
    LogoUsd,
} from "@vicons/ionicons5";
import { createURL } from '../../utils';
import "./index.less";

export default defineComponent({
    name: "Footer",
    setup() {
        const toDonate = () => {
            createURL('https://afdian.net/a/gomi_gxy/plan');
        }        

        const toHome = () => {
            createURL('https://gomi.site/VideoRoll');
        };

        const toFeedBack = () => {
            createURL('https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm')
        };

        return () => (
            <div class="video-roll-footer">
                <p onClick={toDonate}><a href="" class="text-link">Pay what you like</a> - made by <a href="" class="text-link">Gomi</a></p>
            </div>
        );
    }
});
