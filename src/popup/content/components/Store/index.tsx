/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import { FileTrayOutline, FileTrayFullOutline } from "@vicons/ionicons5";

import "./index.less";

export default defineComponent({
    name: "Store",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setStore = () => {
            rollConfig.store = !rollConfig.store;
            update("store", rollConfig.store);
        };

        return () => (
            <div class={`video-roll-store video-roll-item ${rollConfig.store ? 'video-roll-on' : 'video-roll-off'}`} onClick={setStore}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            rollConfig.store ? <FileTrayOutline
                            class="video-roll-icon"
                        ></FileTrayOutline> : <FileTrayFullOutline class="video-roll-icon"></FileTrayFullOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
