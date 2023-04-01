/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Focus",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setFocus = (value: boolean) => {
            rollConfig.focus.on = value;
            update("focus", rollConfig.focus);
        };
        return () => (
            <div class="video-roll-focus">
                <div class="focus-switch-box">
                    <span class="focus-label">
                        off
                    </span>
                    <van-switch
                        class="focus-switch-btn"
                        v-model={rollConfig.focus.on}
                        size="22px"
                        onUpdate:modelValue={setFocus}
                    />
                    <span class="focus-label">
                        on
                    </span>
                </div>
            </div>
        );
    },
});
