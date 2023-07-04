/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Scale",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        let { scale } = rollConfig as IRollConfig;

        const setScaleMode = (value: "auto" | "custom") => {
            rollConfig.scale.mode = value;
            update("scale", rollConfig.scale);
        };

        const setScaleX = (value: number) => {
            rollConfig.scale.values[0] = value;
            update("scale", rollConfig.scale);
        };

        const setScaleY = (value: number) => {
            rollConfig.scale.values[1] = value;
            update("scale", rollConfig.scale);
        };

        return () => (
            <div class="video-roll-rotate">
                {degBtns.value.map((item) => (
                    <div
                        class={`rotate-${item.type}-${item.iconDeg} rotate-btn`}
                        key={item.type}
                        onClick={() => update("deg", item.deg)}
                    >
                        <ChevronBackOutline />
                    </div>
                ))}
            </div>
        );
    },
});
