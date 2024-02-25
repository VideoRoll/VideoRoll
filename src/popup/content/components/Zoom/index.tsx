/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { ExpandOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Zoom",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setZoomNum = (value: number) => {
            rollConfig.zoom = value;
            update("zoom", value);
        };

        return () => (
            <>
                <div class="video-roll-long-box">
                    <div class={`video-roll-switch ${rollConfig.zoom !== 1 ? 'video-roll-switch-on':'video-roll-switch-off'}`} onClick={() => setZoomNum(1)}>
                        {/* <ExpandOutline class="video-roll-icon"></ExpandOutline> */}
                        reset
                    </div>
                    <div class="video-roll-zoom">
                        <van-slider
                            v-model={rollConfig.zoom}
                            min={0}
                            max={3}
                            step={0.01}
                            bar-height="4px"
                            onUpdate:modelValue={setZoomNum}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">{rollConfig.zoom}</div>
                                ),
                            }}
                        ></van-slider>
                    </div>
                </div>
            </>
        );
    },
});
