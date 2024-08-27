/*
 * @description: download Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { InfiniteOutline } from "@vicons/ionicons5";
import "./index.less";
import browser from 'webextension-polyfill'
import { IRollConfig } from "src/types/type";

export default defineComponent({
    name: "Loop",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setLoop = () => {
            rollConfig.loop = !rollConfig.loop;
            update("loop", rollConfig.loop);
        };

        return () => (
            <div v-tooltip={browser.i18n.getMessage('video_loop')} class={`video-roll-focus video-roll-item ${rollConfig.loop ? 'video-roll-on' : 'video-roll-off'}`} onClick={setLoop}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        <InfiniteOutline class="video-roll-icon"></InfiniteOutline>
                    </span>
                </div>
            </div>
        );
    },
});
