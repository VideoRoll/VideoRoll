/*
 * @description: pitch Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type";
import { getDefaultConfig } from '../../use';
import "./index.less";

export default defineComponent({
    name: "Pitch",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPitchOn = (value: 0 | 1) => {
            rollConfig.pitch.on = value;
            update("pitch", rollConfig.pitch);
        };

        const setPitch = (value: number) => {
            rollConfig.pitch.value = value;
            update("pitch", rollConfig.pitch);
        };

        const reset = () => {
            setPitch(getDefaultConfig().pitch.value);
        };

        return () => (
            <>
                <van-button class="video-roll-resetBtn" size="mini" icon="replay" type="primary" onClick={reset}>reset</van-button>
                <div class="video-roll-pitch-box">
                    <van-radio-group
                        v-model={rollConfig.pitch.on}
                        direction="horizontal"
                        onChange={setPitchOn}
                    >
                        <van-radio name={0} >Unset</van-radio>
                        <van-radio name={1} >Custom</van-radio>
                    </van-radio-group>
                    <van-divider
                        class={!rollConfig.pitch.on
                            ? "disable-label"
                            : "enable-label"}
                    >
                        Pitch
                    </van-divider>
                    <div class="video-roll-pitch">
                        <span class="zoom-label">low</span>
                        <van-slider
                            v-model={rollConfig.pitch.value}
                            min={-1}
                            max={1}
                            step={0.01}
                            bar-height="4px"
                            disabled={!rollConfig.pitch.on}
                            onUpdate:modelValue={setPitch}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.pitch.value}
                                    </div>
                                ),
                            }}
                        ></van-slider>
                        <span class="zoom-label">high</span>
                    </div>
                </div>


            </>

        );
    },
});
