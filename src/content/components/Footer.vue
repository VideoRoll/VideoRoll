<!--
 * @description: Footer
 * @Author: Gouxinyu
 * @Date: 2022-09-06 23:22:57
-->
<template>
    <div class="video-roll-footer">
        <div class="video-roll-github" @click="toGithub" title="star it!">
            <logo-github color="#ffffff"></logo-github>
        </div>

        <div class="video-roll-home" @click="toHome" title="gomi.site">
            <home class="home" color="#ffffff"></home>
        </div>

        <div
            class="video-roll-thumbs-up"
            @click="toFeedBack"
            title="thumbs up!"
        >
            <thumbs-up class="thumbs-up" color="#ffffff"></thumbs-up>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    ChevronBackOutline,
    LogoGithub,
    Home,
    ThumbsUp,
} from "@vicons/ionicons5";
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

        return {
            toFeedBack,
            toGithub,
            toHome,
        };
    },
    components: {
        ThumbsUp,
        Home,
        ChevronBackOutline,
        LogoGithub,
    },
});
</script>

<style lang="less">
.video-roll-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 10px 0;
    color: #fff;
    font-weight: bold;

    .video-roll-github,
    .video-roll-home,
    .video-roll-thumbs-up {
        width: 15px;
        height: 15px;
        margin: 5px;
        cursor: pointer;

        &:hover {
            svg {
                color: #a494c6 !important;
            }
        }
    }
}
</style>
