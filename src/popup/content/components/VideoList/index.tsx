/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { ExpandOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";
import VideoRoll from "src/inject/VideoRoll";

export default defineComponent({
    name: "VideoList",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPlaybackRateNum = (value: number) => {
            rollConfig.playbackRate = value;
            update("playbackRate", value);
        };

        return () => (
            <>
                <div>
                    {rollConfig.videoList.map((v) => v.name)}
                    <div></div>
                </div>
            </>
        );
    },
});
