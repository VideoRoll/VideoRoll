/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Scale",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        let { scale } = rollConfig as IRollConfig;

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

        return () => (
            <div class="video-roll-scale">
                <van-radio-group
                    v-model={scale.mode}
                    direction="horizontal"
                    onChange={setScaleMode}
                >
                    <van-radio name="auto">Auto</van-radio>
                    <van-radio name="custom">Custom</van-radio>
                </van-radio-group>
                <div class="video-roll-scale-custom">
                    <div class="video-roll-scale-slider">
                        <van-divider
                            class={
                                scale.mode === "auto"
                                    ? "disable-label"
                                    : "enable-label"
                            }
                        >
                            X
                        </van-divider>
                        <van-slider
                            v-model={scale.values[0]}
                            min={0}
                            max={4}
                            step="0.01"
                            bar-height="4px"
                            disabled={scale.mode === "auto"}
                            onUpdate:modelValue={setScaleX}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {scale.values[0]}
                                    </div>
                                ),
                            }}
                        ></van-slider>
                    </div>

                    <div class="video-roll-scale-slider">
                        <van-divider
                            class={
                                scale.mode === "auto"
                                    ? "disable-label"
                                    : "enable-label"
                            }
                        >
                            Y
                        </van-divider>
                        <van-slider
                            v-model={scale.values[1]}
                            min="0"
                            max="4"
                            step="0.01"
                            bar-height="4px"
                            disabled={scale.mode === "auto"}
                            onUpdate:modelValue={setScaleY}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {scale.values[1]}
                                    </div>
                                ),
                            }}
                        ></van-slider>
                    </div>
                </div>
            </div>
        );
    },
});
