<template>
    <div>
        <Head></Head>
        <n-collapse-transition>
            <div class="video-roll-content">
                <div class="video-roll-website">
                    <span>视频网站: bilibili</span>
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
                <span>Powered by Naive UI</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import Head from './Head.vue';
import { NButton, NSwitch, NIcon, NCollapseTransition } from 'naive-ui'
import { ChevronBackOutline } from '@vicons/ionicons5';
import WEBSITE from '../website';

export default defineComponent({
    name: "App",
    setup(props) {
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

        const getScaleNumber = (dom: HTMLVideoElement, deg: number) => {
            // get video size
            const { videoWidth, videoHeight, offsetWidth, offsetHeight } = dom;

            const isHorizonDeg = deg === 90 || deg === 270;

            // 根据原始视频的宽高比例，和容器的宽高比例，计算缩放比例
            const isHorizonVideo = videoWidth > videoHeight;
            const isHorizonDom = offsetWidth > offsetHeight;

            // 判断旋转后的缩放比例
            // 1.若是竖屏视频，但在横屏容器中，初始就是等比缩小的
            if (isHorizonDeg && !isHorizonVideo && isHorizonDom) {
                return videoHeight / videoWidth;
            }

            // 2.若是竖屏视频，横屏中，旋转回0或180
            if (!isHorizonDeg && !isHorizonVideo && isHorizonDom) {
                return 1;
            }

            // 3.若是横屏视频，处在横屏容器中
            if (isHorizonDeg && isHorizonVideo && isHorizonDom) {
                return offsetHeight / offsetWidth;
            }

            if (!isHorizonDeg && isHorizonVideo && isHorizonDom) {
                return 1;
            }
        }

        /**
         * 旋转
         */
        const rotate = async (item) => {
            console.log('旋转');
            let queryOptions = { active: true, currentWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            console.log(tab);
            // chrome.tabs.sendMessage('', { item }, {}, (res) => {
            //     console.log(res);
            // })
            console.log(item);
            const { deg } = item;
            const { hostname } = window.location;
            console.log(document);
            console.log(chrome);
            // console.log(WEBSITE);
            let website = null;
            for (const key of Object.keys(WEBSITE)) {
                if (hostname.includes(key)) {
                    website = WEBSITE[key];
                    return;
                }
            }

            if (website) {
                for (const item of website.videoSelector) {
                    const dom = document.querySelector(item);
                    if (dom) {
                        dom.style.transform = `rotate(${deg}deg)`;
                        return;
                    }
                }
            } else {
                const dom = document.querySelector('video');
                if (dom) {
                    const scale = getScaleNumber(dom, deg);
                    dom.style.transform = `rotate(${deg}deg) scale(${scale})`;
                    return;
                }
            }
            // chrome.tabs.query(
            //     { active: true, currentWindow: true },
            //     function (tabs) {
            //         chrome.scripting.executeScript({
            //             target: { tabId: tabs[0].id },
            //             function: () => {
            //                 console.log(123);
            //             }
            //         });
            //     }
            // );
        }

        return {
            rotateBtns,
            rotate
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