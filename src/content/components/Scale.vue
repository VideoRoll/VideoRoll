<!--
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-scale">
        <van-radio-group
            v-model="scale.mode"
            direction="horizontal"
            @change="setScaleMode"
        >
            <van-radio name="auto">Auto</van-radio>
            <van-radio name="custom">Custom</van-radio>
        </van-radio-group>
        <div class="video-roll-scale-custom">
            <div class="video-roll-scale-slider">
                <van-divider>X</van-divider>
                <van-slider
                    v-model="scale.values[0]"
                    :min="0"
                    :max="4"
                    :step="0.01"
                    bar-height="4px"
                    :disabled="scale.mode === 'auto'"
                    @update:model-value="setScaleX"
                >
                    <template #button>
                        <div class="custom-button">{{ scale.values[0] }}</div>
                    </template>
                </van-slider>
            </div>

            <div class="video-roll-scale-slider">
                <van-divider>Y</van-divider>
                <van-slider
                    v-model="scale.values[1]"
                    :min="0"
                    :max="4"
                    :step="0.01"
                    bar-height="4px"
                    :disabled="scale.mode === 'auto'"
                    @update:model-value="setScaleY"
                >
                    <template #button>
                        <div class="custom-button">{{ scale.values[1] }}</div>
                    </template>
                </van-slider>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../type.d";

export default defineComponent({
    name: "Scale",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        let { scale } = rollConfig;

        const setScaleMode = (value: "auto" | "custom") => {
            rollConfig.scale.mode = value;
            update("scale", rollConfig.scale);
        };

        const setScaleX = (value: number) => {
            rollConfig.scale.values[0] = value;
            update("scale", rollConfig.scale);
        };

        const setScaleY = (value: number) => {
            rollConfig.scale.values[1] = value;
            update("scale", rollConfig.scale);
        };

        return {
            scale,
            setScaleMode,
            setScaleX,
            setScaleY,
        };
    },
    components: {},
});
</script>

<style lang="less">
.video-roll-scale {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;

    .video-roll-scale-custom {
        width: 100%;
    }
}

.van-radio {
    margin-bottom: 10px;
}

.scale-label {
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
