/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, ref, watch } from "vue";
import { ExpandOutline } from "@vicons/ionicons5";
import type { IRollConfig, VideoListItem } from "../../../../types/type.d";
import "./index.less";
import VideoRoll from "src/inject/VideoRoll";

export default defineComponent({
    name: "VideoList",
    setup() {
        const onHoverVideo = inject("onHoverVideo") as Function;
        const updateVideoCheck = inject("updateVideoCheck") as Function;
        const videoList = inject("videoList") as any;

        const checked = ref(videoList.value.filter((v: any) => v.checked).map((v: any) => v.id));

        const getCheckedVideo = (list: any) => {
            return list.filter((v: any) => v.checked).map((v: any) => v.id);
        }

        const onChange = (ids: string[]) => {
            updateVideoCheck(ids);
        }

        watch(() => videoList, (value) => {
            checked.value = getCheckedVideo(value);
        }, { deep: true });

        return () => (
            <div>
                <van-checkbox-group v-model={checked.value} onChange={onChange}>
                    {videoList.value.map((v) =>
                        <div class="video-item" onMouseleave={() => onHoverVideo(v.id, false)} onMouseenter={() => onHoverVideo(v.id, true)}>
                            <van-checkbox name={v.id} key={v.id} iconSize={15}>
                                <div class="video-name">
                                    <span>{v.name}</span>
                                    {v.visible ? <van-tag type="success">visible</van-tag> : <van-tag type="warning">invisible</van-tag>}
                                </div>
                            </van-checkbox>
                        </div>

                    )}
                </van-checkbox-group>
            </div>
        );
    },
});
