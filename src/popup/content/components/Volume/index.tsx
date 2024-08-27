/*
 * @description: pitch Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type";
import { ReloadOutline} from '@vicons/ionicons5'
import browser from "webextension-polyfill";
import "./index.less";

export default defineComponent({
    name: "Volume",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setVolume = (value: number) => {
            rollConfig.volume = value;
            update("volume", rollConfig.volume);
        };

        return () => (
            <>
                <div class="video-roll-long-box">
                    <div v-tooltip={browser.i18n.getMessage('action_reset')} class={`video-roll-switch ${rollConfig.volume !== 1 ? 'video-roll-switch-on' : 'video-roll-switch-off'}`} onClick={() => setVolume(1)}>
                        <ReloadOutline class="reset-icon"></ReloadOutline>
                    </div>
                    <div class="video-roll-pitch">
                        <van-slider
                            v-model={rollConfig.volume}
                            min={0}
                            max={6}
                            step={0.01}
                            bar-height="4px"
                            onUpdate:modelValue={setVolume}
                            v-slots={{
                                button: () => (
                                    <div class="custom-button">
                                        {rollConfig.volume}
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
