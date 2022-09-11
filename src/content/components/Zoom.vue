<!--
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-zoom">
        <span class="zoom-label">out</span>
        <van-slider
            v-model="rollConfig.zoom"
            :min="0"
            :max="2"
            :step="0.01"
            bar-height="4px"
            @update:model-value="setZoomNum"
        >
            <template #button>
                <div class="custom-button">{{ rollConfig.zoom }}</div>
            </template>
        </van-slider>
        <span class="zoom-label">in</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../type.d";
export default defineComponent({
    name: "Zoom",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setZoomNum = (value: number) => {
            rollConfig.zoom = value;
            update("zoom", value);
        };
        return {
            rollConfig,
            setZoomNum,
        };
    },
    components: {},
});
</script>

<style lang="less">
.video-roll-zoom {
    display: flex;
    align-items: center;
    width: 180px;

    .video-roll-zoom-custom {
        width: 100%;
    }
}

.zoom-label {
    width: 40px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.custom-button {
    user-select: none;
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: var(--van-primary-color);
    border-radius: 100px;
}
</style>
