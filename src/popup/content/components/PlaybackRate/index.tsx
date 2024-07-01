/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "PlaybackRate",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPlaybackRateNum = (value: number) => {
            rollConfig.playbackRate = value;
            update("playbackRate", value);
        };

        return () => (
            <>
                <div class="video-roll-long-box">
                    <div class={`video-roll-switch ${rollConfig.zoom !== 1 ? 'video-roll-switch-on':'video-roll-switch-off'}`} onClick={() => setPlaybackRateNum(1)}>
                        {/* <ExpandOutline class="video-roll-icon"></ExpandOutline> */}
                        reset
                    </div>
                    <div class="video-roll-zoom">
                        <van-slider
                            v-model={rollConfig.playbackRate}
                            min={0}
                            max={4}
                            step={0.01}
                            bar-height="4px"
                            onUpdate:modelValue={setPlaybackRateNum}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">{rollConfig.playbackRate}</div>
                                ),
                            }}
                        ></van-slider>
                    </div>
                </div>
            </>
        );
    },
});
