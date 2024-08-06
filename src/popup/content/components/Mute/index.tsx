/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Mute",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setMuted = () => {
            rollConfig.muted = !rollConfig.muted;
            update("focus", rollConfig.focus);
        };
        return () => (
            <div title='Muted' class={`video-roll-focus video-roll-item ${rollConfig.muted ? 'video-roll-on' : 'video-roll-off'}`} onClick={setMuted}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            rollConfig.muted ? <EyeOutline
                            class="video-roll-icon"
                        ></EyeOutline> : <EyeOffOutline class="video-roll-icon"></EyeOffOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
