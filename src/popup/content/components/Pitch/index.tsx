/*
 * @description: mve Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../../../types/type";
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

        return () => (
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
        );
    },
});
