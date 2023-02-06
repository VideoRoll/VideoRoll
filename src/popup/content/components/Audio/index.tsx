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

        const setMoveX = (value: number) => {
            rollConfig.move.x = value;
            update("move", rollConfig.move);
        };

        const setMoveY = (value: number) => {
            rollConfig.move.y = value;
            update("move", rollConfig.move);
        };
        return () => (
            <div class="video-roll-move">
                <div class="move-box">
                    <van-divider class="move-label">Left - Right</van-divider>
                    <div class="move-slider">
                        <van-slider
                            v-model={rollConfig.move.x}
                            min={-100}
                            max={100}
                            step={1}
                            bar-height="4px"
                            onUpdate:modelValue={setMoveX}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.move.x}
                                    </div>
                                ),
                            }}
                        ></van-slider>
                    </div>
                </div>
                <div class="move-box">
                    <van-divider class="move-label">Bottom - Top</van-divider>
                    <div class="move-slider">
                        <van-slider
                            v-model={rollConfig.move.y}
                            min={-100}
                            max={100}
                            step={1}
                            bar-height="4px"
                            onUpdate:modelValue={setMoveY}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.move.y}
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
