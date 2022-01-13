<!--
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-01-13 20:09:30
-->
<template>
    <div class="video-roll-header">
        <div class="video-roll-logo">
            <img />
            <span>VideoRoll</span>
        </div>
        <div>
            <n-switch size="small" v-model:value="isOpen" @update:value="handleChange" />
        </div>
    </div>
    <div class="video-roll-content">
        <div class="video-roll-website">
            <span>视频网站: bilibili</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NButton, NSwitch, NDatePicker } from 'naive-ui'

export default defineComponent({
    name: "App",
    setup() {
        // 受否开启
        const isOpen = ref(false);

        const handleChange = (value) => {
            isOpen.value = value;
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
#app {
    width: 300px;
    height: 500px;
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
        .video-roll-website {
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            padding: 10px 0;
        }
    }
}
</style>