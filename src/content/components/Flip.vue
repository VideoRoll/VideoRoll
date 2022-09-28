<!--
 * @description: flip Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-flip">
        <van-radio-group v-model="rollConfig.flip" @change="setFlip">
            <van-radio name="unset">Unset</van-radio>
            <van-radio name="horizontal">Horizontal</van-radio>
            <van-radio name="vertical">Vertical</van-radio>
        </van-radio-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
    name: "Flip",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setFlip = (value: string) => {
            update("flip", value);
        };
        return {
            rollConfig,
            setFlip,
        };
    },
});
</script>

<style lang="less">
.van-radio {
    margin-bottom: 10px;
}
</style>
