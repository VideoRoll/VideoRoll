/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
<ion-icon name="eye-outline"></ion-icon>
import { defineComponent, inject } from "vue";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
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
            <div title='Focus mode' class={`video-roll-focus video-roll-item ${rollConfig.focus.on ? 'video-roll-on' : 'video-roll-off'}`} onClick={setFocus}>
                <div class="focus-switch-box">
                    <span class="focus-label">
                        {
                            rollConfig.focus.on ? <EyeOutline
                            class="video-roll-icon"
                        ></EyeOutline> : <EyeOffOutline class="video-roll-icon"></EyeOffOutline>
                        }
                    </span>
                    {/* <van-switch
                        class="focus-switch-btn"
                        v-model={rollConfig.focus.on}
                        size="22px"
                        onUpdate: modelValue={setFocus}
                    /> */}
                </div>
            </div>
        );
    },
});
