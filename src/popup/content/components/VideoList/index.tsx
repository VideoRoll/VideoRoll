/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, ref, watch } from "vue";
import "./index.less";

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

        const onError = function() {
            this.src = <VideocamOutline />
        }

        watch(() => videoList.value, (value) => {
            checked.value = getCheckedVideo(value);
        }, { deep: true });

        return () => (
            <div>
                <van-checkbox-group v-model={checked.value} onChange={onChange}>
                    {videoList.value.map((v: any) =>
                        <div class="video-item" onMouseleave={() => onHoverVideo(v.id, false)} onMouseenter={() => onHoverVideo(v.id, true)}>
                            <van-checkbox name={v.id} key={v.id} iconSize={15}>
                                <div class="video-item-box">
                                    <div class="video-poster-box">
                                        <img class="video-poster" src={v.posterUrl} onError={onError}></img>
                                    </div>
                                    <div class="video-info">
                                        <div class="video-info-name">
                                            {v.name}
                                        </div>
                                        <div class="video-tags">
                                            <van-tag plain type="primary">{v.duration} mins</van-tag>
                                            {
                                                v.isReal ? <van-tag type="success">main</van-tag> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </van-checkbox>
                        </div>

                    )}
                </van-checkbox-group>
            </div>
        );
    },
});
