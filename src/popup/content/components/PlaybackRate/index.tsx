/*
 * @description: zoom Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, ref } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import browser from "webextension-polyfill";
import "./index.less";

export default defineComponent({
    name: "PlaybackRate",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const selections = ref([
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
        const setPlaybackRateNum = (value: number) => {
            rollConfig.playbackRate = value;
            update("playbackRate", value);
        };


        return () => (
            <>
                <div class="video-roll-long-box">
                    <div class="speed-item">0.25x</div>
                    <div class="speed-item">0.5x</div>
                    <div class="speed-item">1x</div>
                    <div class="speed-item">2.0x</div>
                    <div class="speed-item">4.0x</div>
                    <div class="speed-item">16.0x</div>
                    <div class="speed-item">16.0x</div>
                    <van-popover placement="bottom-end" theme="dark" class="popover-size" v-model={isShow} actions={actions} onSelect={onSelect} v-slots={{
                        reference: () => (
                            <div title='Download' class='video-roll-download video-roll-item video-roll-off'>
                                <div class="video-roll-icon-box">
                                    <span class="video-roll-label">
                                        <ArrowDownOutline class="video-roll-icon"></ArrowDownOutline>
                                    </span>
                                </div>
                            </div>
                        ),
                    }}>
                    </van-popover>
                    {/* <div class="speed-item"></div> */}
                    {/* <div class={`video-roll-switch ${rollConfig.playbackRate !== 1 ? 'video-roll-switch-on':'video-roll-switch-off'}`} onClick={() => setPlaybackRateNum(1)}>
                        {browser.i18n.getMessage('action_reset')}
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
                    </div> */}
                </div>
            </>
        );
    },
});
