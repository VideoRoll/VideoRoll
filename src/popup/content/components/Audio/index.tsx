/*
 * @description: mve Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Audio",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPitch = (value: number) => {
            rollConfig.audio.pitch = value;
            update("audio", rollConfig.audio);
        };

        const setRate = (value: number) => {
            rollConfig.audio.rate = value;
            update("audio", rollConfig.rate);
        };
        return () => (
            <div class="video-roll-move">
                <div class="move-box">
                    <van-divider class="move-label">down - up</van-divider>
                    <div class="move-slider">
                        <van-slider
                            v-model={rollConfig.audio.pitch}
                            min={-100}
                            max={100}
                            step={1}
                            bar-height="4px"
                            onUpdate:modelValue={setPitch}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.audio.pitch}
                                    </div>
                                ),
                            }}
                        ></van-slider>
                    </div>
                </div>
                <div class="move-box">
                    <van-divider class="move-label">slow - fast</van-divider>
                    <div class="move-slider">
                        <van-slider
                            v-model={rollConfig.audio.rate}
                            min={-100}
                            max={100}
                            step={1}
                            bar-height="4px"
                            onUpdate:modelValue={setRate}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.audio.rate}
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
