/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, ref, watch } from "vue";
import browser from "webextension-polyfill";
import "./index.less";
import { IRollConfig } from "src/types/type";

export default defineComponent({
    name: "VideoList",
    setup() {
        const rollConfig = inject("rollConfig") as IRollConfig;
        const onHoverVideo = inject("onHoverVideo") as Function;
        const updateVideoCheck = inject("updateVideoCheck") as Function;
        const videoList = inject("videoList") as any;

        const getCheckedVideo = (list: any) => {
            return list.filter((v: any) => v.checked).map((v: any) => v.id);
        }

        const checked = ref(getCheckedVideo(videoList.value));

        const onChange = (ids: string[]) => {
            updateVideoCheck(ids);
        }

        const onError = function () { }

        watch(() => videoList.value, (value) => {
            const list = getCheckedVideo(value);
            if (JSON.stringify(list) === JSON.stringify(checked.value)) return;
            checked.value = [...list];
        }, { deep: true });

        return () => (
            <div>
                <van-notice-bar
                    left-icon="tv-o"
                    color="#1989fa"
                    background="transparent"
                    text={rollConfig.document?.title}
                />
                <van-checkbox-group v-model={checked.value} onChange={onChange}>
                    {videoList.value.length ? videoList.value.sort((a: any, b: any) => Number(b.isReal) - Number(a.isReal)).map((v: any) =>
                        <div class="video-item" onMouseleave={() => onHoverVideo(v.id, false)} onMouseenter={() => onHoverVideo(v.id, true)}>
                            <van-checkbox name={v.id} key={v.id} iconSize={15}>
                                <div class="video-item-box">
                                    <div class="video-poster-box">
                                        {
                                            v.posterUrl ? <img class="video-poster" src={v.posterUrl} onError={onError}></img> :
                                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon video-poster" viewBox="0 0 512 512"><path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" /></svg>
                                        }

                                    </div>
                                    <div class="video-info">
                                        <div class="video-info-name">
                                            {v.name}
                                        </div>
                                        <div class="video-tags">
                                            <van-tag plain type="primary">{v.duration} mins</van-tag>
                                            {
                                                v.isReal ? <van-tag type="success">{browser.i18n.getMessage('list_main')}</van-tag> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </van-checkbox>
                        </div>
                    ) : <div><van-empty description="未检测到视频" /></div>}
                </van-checkbox-group>
            </div>
        );
    },
});
