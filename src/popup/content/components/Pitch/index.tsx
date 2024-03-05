/*
 * @description: pitch Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, watch } from "vue";
import { PulseOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type";
import { getDefaultConfig } from '../../use';
import "./index.less";

export default defineComponent({
    name: "Pitch",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPitch = (value: number) => {
            rollConfig.pitch.value = value;
            update("pitch", rollConfig.pitch);
        };

        const setPitchOn = () => {
            if (!rollConfig.pitch.on) rollConfig.pitch.value = 0;
            update("pitch", rollConfig.pitch);
        };

        return () => (
            <>
                <div class="video-roll-long-box">
                    <van-switch v-model={rollConfig.pitch.on} size="15px" onChange={setPitchOn}></van-switch>
                    {/* <div class={`video-roll-switch ${rollConfig.pitch.on ? 'video-roll-switch-on':'video-roll-switch-off'}`} onClick={setPitchOn}>
                        <PulseOutline class="video-roll-icon"></PulseOutline>
                    </div> */}
                    <div class="video-roll-pitch">
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
                    </div>
                </div>
            </>
        );
    },
});
