<!--
 * @description: flip Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-flip">
        <van-radio-group v-model="checked">
            <van-radio name="1">单选框 1</van-radio>
            <van-radio name="2">单选框 2</van-radio>
        </van-radio-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted } from 'vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Flip",
    props: {},
    setup(props) {
        const checked = ref(1);

        return {
            checked
        }
    },
    components: {
        ChevronDownOutline
    }
})
</script>

<style lang="less">
</style>