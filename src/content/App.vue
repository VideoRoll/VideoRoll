<!--
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-01-13 20:09:30
-->
<template>
    <div>
        <div class="video-roll-header">
            <div class="video-roll-logo">
                <img />
                <span>VideoRoll</span>
            </div>
            <div>
                <n-switch size="small" v-model:value="isOpen" @update:value="handleChange" />
            </div>
        </div>
        <n-collapse-transition :show="isOpen">
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
                        :onclick="rotate"
                        :style="`transform: rotate(${item.deg}deg)`"
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

<script>
import { defineComponent, ref } from 'vue'
import { NButton, NSwitch, NIcon, NCollapseTransition } from 'naive-ui'
import { ChevronBackOutline } from '@vicons/ionicons5';
import WEBSITE from '../website';
export default defineComponent({
    name: "App",
    setup() {
        // 受否开启
        const isOpen = ref(false);

        const rotateBtns = ref([
            {
                type: 'left',
                deg: 0
            },
            {
                type: 'up',
                deg: 90
            },
            {
                type: 'right',
                deg: 180
            },
            {
                type: 'down',
                deg: 270
            }
        ]);

        /**
         * 是否开启旋转功能
         */
        const handleChange = (value) => {
            isOpen.value = value;

            if (value) {
                console.log(window.location);
                chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                        console.log(tabs, WEBSITE);
                        // chrome.scripting.executeScript({
                        //     target: { tabId: tabs[0].id },
                        //     function: () => {
                        //         console.log(123);
                        //     }
                        // });
                    }
                );
            }
        }

        /**
         * 旋转
         */
        const rotate = () => {
            console.log('hhh');
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: () => {
                            console.log(123);
                        }
                    });
                }
            );
        }
        return {
            isOpen,
            rotateBtns,
            handleChange,
            rotate
        }
    },
    components: {
        NSwitch,
        NButton,
        NIcon,
        NCollapseTransition,
        ChevronBackOutline
    }
})
</script>

<style lang="less">
// .vdo {
//     width: 400px;
//     height: 300px;
//     border: 1px solid red;

//     video {
//         width: 100%;
//         height: 100%;
//     }
// }
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