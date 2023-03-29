/*
 * @description: mve Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type";
import { getDefaultConfig } from '../../use/useConfig';
import "./index.less";

export default defineComponent({
    name: "Pitch",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPitch = (value: number) => {
            rollConfig.pitch = value;
            update("pitch", rollConfig.pitch);
        };

        const reset = () => {
            setPitch(getDefaultConfig().pitch)
        };

        return () => (
            <>
                <van-button class="video-roll-resetBtn" size="mini" icon="replay" type="primary" onClick={reset}>reset</van-button>
                <div class="video-roll-pitch">
                    <span class="zoom-label">low</span>
                    <van-slider
                        v-model={rollConfig.pitch}
                        min={-1}
                        max={1}
                        step={0.01}
                        bar-height="4px"
                        onUpdate:modelValue={setPitch}
                        v-slots={{
                            button: () => (
                                <div class="custom-button">
                                    {rollConfig.pitch}
                                </div>
                            ),
                        }}
                    ></van-slider>
                    <span class="zoom-label">high</span>
                </div>
            </>

        );
    },
});
