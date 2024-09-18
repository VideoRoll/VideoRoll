import { defineComponent, inject } from "vue";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import browser from 'webextension-polyfill'
import "./index.less";

export default defineComponent({
    name: "Vr",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setVr = () => {
            rollConfig.vr.on = !rollConfig.vr.on;
            update("vr", rollConfig.vr);
        };
        return () => (
            <div v-tooltip={browser.i18n.getMessage('video_focus')} class={`video-roll-focus video-roll-item ${rollConfig.vr.on ? 'video-roll-on' : 'video-roll-off'}`} onClick={setVr}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            rollConfig.vr.on ? <EyeOutline
                            class="video-roll-icon"
                        ></EyeOutline> : <EyeOffOutline class="video-roll-icon"></EyeOffOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
