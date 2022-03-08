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
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NSwitch } from 'naive-ui';
export default defineComponent({
    name: "Head",
    setup(props) {
    },
    components: {
        NSwitch
    }
})
</script>

<style lang="less">
</style>