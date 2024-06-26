/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { ExpandOutline } from "@vicons/ionicons5";
import type { IRollConfig, VideoListItem } from "../../../../types/type.d";
import "./index.less";
import VideoRoll from "src/inject/VideoRoll";

export default defineComponent({
    name: "VideoList",
    setup() {
        const update = inject("update") as Function;
        const videoList = inject("videoList") as any;

        console.log(videoList, 'videoList');
        return () => (
            <div>
                {videoList.value.map((v) => <div class="video-name">{v.name}</div>)}
            </div>
        );
    },
});
