/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, onMounted, ref, shallowRef } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import { EllipsisVertical, ReloadOutline } from "@vicons/ionicons5";
import browser from "webextension-polyfill";
import "./index.less";

export default defineComponent({
    name: "PlaybackRate",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const selected = ref('');
        const isShow = ref(false);
        const selections = shallowRef([
            {
                title: '0.25x',
                selected: false,
                value: 0.25
            },
            {
                title: '0.5x',
                selected: false,
                value: 0.5
            },
            {
                title: '1.0x',
                selected: false,
                value: 1
            },
            {
                title: '2.0x',
                selected: false,
                value: 2
            },
            {
                title: '4.0x',
                selected: false,
                value: 4
            },
            {
                title: '16.0x',
                selected: false,
                value: 16
            }
        ]);

        onMounted(() => {
            const item = selections.value.find((v) => v.value === rollConfig.playbackRate);
            if (item) {
                selected.value = item.title;
            }
        })

        const setPlaybackRateNum = (item: any) => {
            rollConfig.playbackRate = item.value;
            selected.value = item.title
            update("playbackRate", item.value);
        };

        const setPlaybackRateValue = (value: number) => {
            rollConfig.playbackRate = value;
            const item = selections.value.find((v) => v.value === value);
            selected.value = item ? item.title : '';
            update("playbackRate", value);
        };


        return () => (
            <div class="video-roll-long-box">
                {
                    selections.value.map((item) => <div class={`speed-item ${selected.value === item.title ? 'video-roll-switch-on video-roll-on' : ''}`} onClick={() => setPlaybackRateNum(item)}>{item.title}</div>)
                }
                <van-popover placement="top-end" theme="dark" class="popover-size" v-model={isShow} v-slots={{
                    reference: () => (
                        <span class="video-roll-label">
                            <EllipsisVertical class="video-roll-icon"></EllipsisVertical>
                        </span>
                    ),
                }}>
                    <div class="video-roll-long-box">
                        <div v-tooltip={browser.i18n.getMessage('action_reset')}class={`video-roll-switch ${rollConfig.playbackRate !== 1 ? 'video-roll-switch-on' : 'video-roll-switch-off'}`} onClick={() => setPlaybackRateValue(1)}>
                            <ReloadOutline class="reset-icon"></ReloadOutline>
                        </div>
                        <div class="video-roll-zoom">
                            <van-slider
                                v-model={rollConfig.playbackRate}
                                min={0}
                                max={16}
                                step={0.01}
                                bar-height="6px"
                                onUpdate:modelValue={setPlaybackRateValue}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">{rollConfig.playbackRate}</div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                </van-popover>
            </div>
        );
    },
});
