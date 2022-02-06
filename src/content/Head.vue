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
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NSwitch } from 'naive-ui'
import { ChevronBackOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Head",
    setup(props) {
        // 受否开启
        const isOpen = ref(false);

        /**
         * 是否开启旋转功能
         */
        const handleChange = (value) => {
            isOpen.value = value;

            if (value) {
                console.log(window.location);
            }
        }

        return {
            isOpen,
            handleChange
        }
    },
    components: {
        NSwitch
    }
})
</script>

<style lang="less">
</style>