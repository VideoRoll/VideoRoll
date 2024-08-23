/*
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { LogoGithub, SettingsSharp, StarHalfSharp, ChatbubbleEllipses } from "@vicons/ionicons5";
import { createURL } from 'src/util';
import browser from 'webextension-polyfill'
import "./index.less";
import { IRollConfig } from "src/types/type";

export default defineComponent({
    name: "Head",
    props: {
        isShow: Boolean
    },
    setup(props) {
        const updateEnable = inject("updateEnable") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const update = inject("update") as Function;

        const toGithub = () => {
            createURL('https://github.com/gxy5202/VideoRoll');
        };
        const toSettings = () => {
             if (chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
              } else {
                createURL(chrome.runtime.getURL('options.html'));
              }
        }

        const toHome = () => {
            createURL('https://videoroll.gomi.site');
        };

        const toFeedBack = () => {
            createURL('https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm')
        };

        const toIssue = () => {
            createURL('https://github.com/VideoRoll/VideoRoll/issues');
        }

        const setEnable = (value: boolean) => {
            rollConfig.enable = value;
            update('enable', rollConfig.enable);
            updateEnable(rollConfig.enable);
        }

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
                        <div class="video-roll-setting-btn" v-tooltip={rollConfig.enable ? browser.i18n.getMessage('tips_disabled') : browser.i18n.getMessage('tips_enabled')}>
                            <van-switch v-model={rollConfig.enable} size="12px" onChange={setEnable}></van-switch>
                        </div>
                        <div class="video-roll-setting-btn" v-tooltip={browser.i18n.getMessage('tips_setting')} onClick={toSettings}>
                            <SettingsSharp class="logo-usd"></SettingsSharp>
                        </div>
                        <van-divider vertical></van-divider>
                        <div class="video-roll-feedback">
                            <van-space>
                                <div
                                    class="video-roll-setting-btn"
                                    onClick={toFeedBack}
                                    v-tooltip={browser.i18n.getMessage('tips_rating')}
                                >
                                    <StarHalfSharp class="logo-usd"></StarHalfSharp>
                                </div>
                                <div
                                    class="video-roll-setting-btn"
                                    onClick={toIssue}
                                    v-tooltip={browser.i18n.getMessage('tips_feedback')}
                                >
                                    <ChatbubbleEllipses class="logo-usd"></ChatbubbleEllipses>
                                </div>
                                <div class="video-roll-setting-btn" v-tooltip="github" onClick={toGithub}>
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
