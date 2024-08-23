/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import browser from 'webextension-polyfill'
import "./index.less";

export default defineComponent({
    name: "Focus",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setFocus = () => {
            rollConfig.focus.on = !rollConfig.focus.on;
            update("focus", rollConfig.focus);
        };
        return () => (
            <div v-tooltip={browser.i18n.getMessage('video_focus')} class={`video-roll-focus video-roll-item ${rollConfig.focus.on ? 'video-roll-on' : 'video-roll-off'}`} onClick={setFocus}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            rollConfig.focus.on ? <EyeOutline
                            class="video-roll-icon"
                        ></EyeOutline> : <EyeOffOutline class="video-roll-icon"></EyeOffOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
