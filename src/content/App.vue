<template>
    <div>

        <Head></Head>
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
            <div>
                <span>
                    Created by
                    <span class="video-roll-author" @click="toAuthor">Gomi</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import Head from './Head.vue';
import { ChevronBackOutline } from '@vicons/ionicons5';
import WEBSITE from '../website';

export default defineComponent({
    name: "App",
    setup(props) {
        // current website info
        const webInfo = reactive({
            tabId: '',
            name: '',
            videoSelector: []
        });

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
            chrome.tabs.sendMessage(webInfo.tabId, { webInfo, deg: item.deg }, {}, (res) => {
                console.debug(res);
            });
        }

        /**
         * shortcut key
         */
        const onShortCutKey = () => {

        }

        /**
         * 跳转到Gomi
         */
        const toAuthor = () => {
            chrome.tabs.create({
                active: true,
                url: "https://gomi.site"
            })
        };

        return {
            rotateBtns,
            rotate,
            webInfo,
            toAuthor
        }
    },
    components: {
        ChevronBackOutline,
        Head
    }
})
</script>

<style lang="less">
body {
    margin: 0;
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
            // background-color: red;
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

    .video-roll-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        padding: 10px 0;
        color: #fff;
        font-weight: bold;

        .video-roll-author {
            cursor: pointer;

            &:hover {
                color: #a494c6;
            }
        }
    }
}
</style>