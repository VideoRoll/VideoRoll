<template>
    <div>

        <Head></Head>
        <main>
            <div>
                <div class="video-roll-content">
                    <div class="video-roll-website">
                        <span>{{ webInfo.name }}</span>
                    </div>
                    <div class="video-roll-rotate-control">
                        <div
                             v-for="item in rotateBtns"
                             :class="`rotate-${item.type}-${item.iconDeg} rotate-btn`"
                             :key="item.type"
                             :onclick="() => rotate(item)">
                            <chevron-back-outline color="#a494c6" />
                        </div>
                    </div>
                </div>
                <div class="video-roll-footer">
                    <div class="video-roll-github" @click="toGithub" title="star it!">
                        <logo-github color="#ffffff"></logo-github>
                    </div>

                    <div class="video-roll-home" @click="toHome" title="gomi.site">
                        <home class="home" color="#ffffff"></home>
                    </div>

                    <div class="video-roll-thumbs-up" @click="toFeedBack" title="thumbs up!">
                        <thumbs-up class="thumbs-up" color="#ffffff"></thumbs-up>
                    </div>
                </div>
            </div>
            <div class="video-roll-setting" v-show="isShow">
                <SettingPanel isShow=""></SettingPanel>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, inject, provide } from 'vue';
import Head from './components/Head.vue';
import SettingPanel from './components/SettingPanel.vue';
import { ChevronBackOutline, LogoGithub, Home, ThumbsUp } from '@vicons/ionicons5';
import WEBSITE from '../website';

export default defineComponent({
    name: "App",
    setup(props) {
        const isShow = ref(false);
        const toGithub = () => {
            chrome.tabs.create({
                active: true,
                url: "https://github.com/gxy5202/VideoRoll"
            })
        }

        const toHome = () => {
            chrome.tabs.create({
                active: true,
                url: "https://gomi.site/VideoRoll"
            })
        }

        /**
         * open settings panel
         */
        const onOpenSetting = () => {
            isShow.value = !isShow.value;
        }

        // current website info
        const webInfo = reactive({
            tabId: '',
            name: '',
            flip: 'none',
            deg: 0,
            videoSelector: [] as string[]
        });

        const setFlip = (target) => {
            webInfo.flip = target.value;
            chrome.tabs.sendMessage(webInfo.tabId, { webInfo }, {}, (res) => {
                console.debug(res);
            });
        }

        provide('webInfo', webInfo);
        provide('setFlip', setFlip);
        provide('onOpenSetting', onOpenSetting);

        // url reg
        const urlReg = /^http(s)?:\/\/(.*?)\//;

        /**
         * get video info
         */
        const setWebInfo = (hostName: string) => {
            if (!hostName) {
                webInfo.name = 'Error Website';
                webInfo.videoSelector = ['video'];
                return;
            }

            for (const key of Object.keys(WEBSITE)) {
                if (hostName.includes(key)) {
                    const target = WEBSITE[key];
                    webInfo.name = target.name;
                    webInfo.videoSelector = target.videoSelector;
                    return;
                }
            }
            if (!webInfo.name) {
                webInfo.name = hostName || 'Error Website';
                webInfo.videoSelector = ['video'];
            }
        }

        /**
         * 当打开时就获取当前网站的视频信息
         * 添加样式
         */
        onMounted(async () => {
            let queryOptions = { active: true, currentWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            const hostName = urlReg.exec(tab.url)?.[2];
            setWebInfo(hostName);
            webInfo.tabId = tab.id;

            // add style
            chrome.tabs.sendMessage(webInfo.tabId, { style: true }, {}, (res) => {
                console.debug(res);
            });

            chrome.runtime.onMessage.addListener((a, b, c) => {
                const { flip } = a;
                if (flip) {
                    webInfo.flip = flip;
                }
                c('flip');
            });
        });

        // buttons
        const rotateBtns = ref([
            {
                type: 'left',
                iconDeg: 0,
                deg: 270,
            },
            {
                type: 'up',
                iconDeg: 90,
                deg: 0
            },
            {
                type: 'right',
                iconDeg: 180,
                deg: 90
            },
            {
                type: 'down',
                iconDeg: 270,
                deg: 180
            }
        ]);

        /**
         * 旋转
         */
        const rotate = async (item) => {
            webInfo.deg = item.deg;
            chrome.tabs.sendMessage(webInfo.tabId, { webInfo }, {}, (res) => {
                console.debug(res);
            });
        }

        /**
         * 跳转到反馈
         */
        const toFeedBack = () => {
            chrome.tabs.create({
                active: true,
                url: "https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0"
            })
        };

        return {
            rotateBtns,
            rotate,
            isShow,
            webInfo,
            toFeedBack,
            toGithub,
            toHome
        }
    },
    components: {
        SettingPanel,
        ThumbsUp,
        Home,
        ChevronBackOutline,
        LogoGithub,
        Head
    }
})
</script>

<style lang="less">
body {
    margin: 0;
    --van-primary-color: #a494c6 !important;
    --van-sidebar-width: 65px !important;
    --van-sidebar-padding: 12.5px var(--van-padding-sm) !important;

    ::-webkit-scrollbar {
        width: .6em;
        height: .6em;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(155, 155, 155, 0.4);
        border-radius: .6em;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(155, 155, 155, .6);
    }

    ::-webkit-scrollbar-track {
        background: transparent;
        background: rgba(200, 200, 200, .2);
    }
}

#app {
    width: 300px;
    background-color: rgb(24, 24, 28);

    .video-roll-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #26262a;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        height: 40px;
        padding: 0 10px;
    }

    main {
        position: relative;
    }

    .video-roll-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .video-roll-website {
            height: 25px;
            font-size: 15px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #a494c6;
            padding: 10px 0;
            overflow: hidden;
        }

        .video-roll-rotate-control {
            width: 120px;
            height: 120px;
            border: 5px solid #fff;
            border-radius: 50%;
            position: relative;

            .rotate-btn {
                width: 30px;
                height: 30px;
                cursor: pointer;
                position: absolute;

                &:hover {
                    svg {
                        color: #d194c0;
                    }
                }
            }

            .rotate-up-90 {
                left: 50%;
                transform: rotate(90deg) translateY(50%);
            }

            .rotate-left-0 {
                top: 50%;
                transform: translateY(-50%);
            }

            .rotate-down-270 {
                bottom: 0;
                left: 50%;
                transform: rotate(270deg) translateY(-50%);
            }

            .rotate-right-180 {
                right: 0;
                top: 50%;
                transform: rotate(180deg) translateY(50%);
            }
        }
    }

    .video-roll-setting {
        position: absolute;
        overflow: overlay;
        width: 100%;
        height: 100%;
        top: 0;
    }

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
}
</style>