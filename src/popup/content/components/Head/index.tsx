/*
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { Home, LogoGithub, LogoUsd, SettingsSharp, StarHalfSharp } from "@vicons/ionicons5";
import { createURL } from '../../utils';
import "./index.less";

export default defineComponent({
    name: "Head",
    props: {
        isShow: Boolean
    },
    setup(props) {
        const toGithub = () => {
            createURL('https://github.com/gxy5202/VideoRoll');
        };
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
            <div class="video-roll-header">
                <div class="video-roll-logo" onClick={toHome}>
                    <img
                        class="video-roll-logo-text"
                        src="../../icons/text.png"
                    />
                </div>
                <div class="video-roll-head-right">
                    <van-space>
                        <div class="video-roll-setting-btn" title="settings" onClick={toDonate}>
                            <SettingsSharp class="logo-usd"></SettingsSharp>
                        </div>
                        <van-divider vertical></van-divider>
                        <div class="video-roll-feedback">
                            <van-space>
                                <div
                                    class="video-roll-setting-btn"
                                    onClick={toFeedBack}
                                    title="thumbs up!"
                                >
                                    <StarHalfSharp class="logo-usd"></StarHalfSharp>
                                </div>
                                <div class="video-roll-setting-btn" title="settings" onClick={toGithub}>
                                    <LogoGithub class="logo-usd"></LogoGithub>
                                </div>
                            </van-space>
                        </div>
                    </van-space>
                </div>
            </div>
        );
    }
});
