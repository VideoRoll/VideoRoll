/*
 * @description: pictureInPicture Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { TvOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import browser from 'webextension-polyfill'
// import "./index.less";

export default defineComponent({
    name: "Iframe",
    setup() {
        const rollConfig = inject("rollConfig") as IRollConfig;

        return () => (
            <div>
                <div>未识别到视频，但识别到iframe，点击查看</div>
                <div>
                    {
                        (rollConfig.iframes ?? []).map((url) => <div><a href={url} target="_blank">{url}</a></div>)
                    }
                </div>
            </div>
        );
    },
});
