/*
 * @description: Rotate Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { useConfig, useDegBtn } from "../../use";
import {
    ChevronBackOutline,
} from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Rotate",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const degBtns = useDegBtn();

        return () => (
            <div class="video-roll-rotate-control">
                {degBtns.value.map((item) => (
                    <div
                        class={`rotate-${item.type}-${item.iconDeg} rotate-btn`}
                        key={item.type}
                        onClick={() => {
                            console.log(rollConfig, 'deg')
                            update("deg", item.deg)
                        }}
                    >
                        <ChevronBackOutline />
                    </div>
                ))}
                <div class="rotate-deg-text">
                    {rollConfig.deg}
                </div>
            </div>
        );
    },
});
