<template>
    <div>
        <Head></Head>
        <n-collapse-transition>
            <div class="video-roll-content">
                <div class="video-roll-website">
                    <span>{{ webInfo.name }}</span>
                </div>
                <div class="video-roll-rotate-control">
                    <n-button
                        size="30"
                        v-for="item in rotateBtns"
                        :class="`rotate-${item.type} rotate-btn`"
                        :key="item.type"
                        text
                        color="#18a058"
                        :onclick="() => rotate(item)"
                        :style="`transform: rotate(${item.iconDeg}deg)`"
                    >
                        <template #icon>
                            <n-icon size="30">
                                <chevron-back-outline />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </div>
        </n-collapse-transition>
        <div class="video-roll-footer">
            <div>
                <span>Powered by Vue</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import Head from './Head.vue';
import { NButton, NIcon, NCollapseTransition } from 'naive-ui'
import { ChevronBackOutline } from '@vicons/ionicons5';
import WEBSITE from '../website';

export default defineComponent({
    name: "App",
    setup(props) {
        const webInfo = reactive({
            tabId: '',
            name: '',
            videoSelector: []
        });

        const urlReg = /^http(s)?:\/\/(.*?)\//;

        /**
         * get video info
         */
        const getWebInfo = (hostName: string) => {
            for (const key of Object.keys(WEBSITE)) {
                if (hostName.includes(key)) {
                    const target = WEBSITE[key];
                    webInfo.name = target.name;
                    webInfo.videoSelector = target.videoSelector;
                    return;
                }
            }
            if (!webInfo.name) {
                webInfo.name = hostName;
                webInfo.videoSelector = ['video'];
            }
        }

        /**
         * 当打开时就获取当前网站的视频信息
         */
        onMounted(async () => {
            let queryOptions = { active: true, currentWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);

            const hostName = urlReg.exec(tab.url)[2];
            getWebInfo(hostName);
            webInfo.tabId = tab.id;
        });

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
            let queryOptions = { active: true, currentWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            chrome.tabs.sendMessage(tab.id, { webInfo, deg: item.deg }, {}, (res) => {
                console.log(res);
            });
        }

        return {
            rotateBtns,
            rotate,
            webInfo
        }
    },
    components: {
        NButton,
        NIcon,
        NCollapseTransition,
        ChevronBackOutline,
        Head
    }
})
</script>

<style lang="less">
.vdo {
    width: 400px;
    height: 300px;
    border: 1px solid blue;
    overflow: hidden;
    video {
        width: 100%;
        height: 100%;
    }
}
</style>
<style lang="less">
#app {
    width: 300px;
    background-color: rgb(24, 24, 28);

    .video-roll-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #26262a;
        color: #fff;
        font-weight: bold;
        height: 40px;
        padding: 0 10px;
    }

    .video-roll-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .video-roll-website {
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            padding: 10px 0;
        }

        .video-roll-rotate-control {
            width: 120px;
            height: 120px;
            // background-color: red;
            border: 5px solid #fff;
            border-radius: 50%;
            position: relative;

            .rotate-btn {
                position: absolute;
            }

            .rotate-up {
                left: 50%;
            }

            .rotate-left {
                top: 50%;
                transform: translate(-50%);
            }

            .rotate-down {
                bottom: 0;
                left: 50%;
            }

            .rotate-right {
                right: 0;
                top: 50%;
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
    }
}
</style>