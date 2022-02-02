<!--
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-02-02 14:35:44
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
            <div>{{ res }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { NButton, NSwitch, NIcon, NCollapseTransition } from 'naive-ui'
import { ChevronBackOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "App",
    setup(props) {
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

        const res = computed(() => {
            console.log(props.a);
            console.log(props.b);
            console.log(Number(props.a) >= Number(props.b));
            return props.a >= props.b;
        });

        /**
         * 是否开启旋转功能
         */
        const handleChange = (value) => {
            isOpen.value = value;

            if (value) {
                console.log(window.location);
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
            rotate,
            res
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
</style>