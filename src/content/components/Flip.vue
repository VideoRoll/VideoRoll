<!--
 * @description: flip Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-flip">
        <van-radio-group v-model="checked" @change="setFlip">
            <van-radio name="unset">Unset</van-radio>
            <van-radio name="horizontal">Horizontal</van-radio>
            <van-radio name="vertical">Vertical</van-radio>
        </van-radio-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Flip",
    props: {},
    setup() {
        const checked = ref('unset');

        const setFlip = inject('setFlip');
        return {
            checked,
            setFlip
        }
    },
    components: {
        ChevronDownOutline
    }
})
</script>

<style lang="less">
.van-radio {
    margin-bottom: 10px;
}
</style>