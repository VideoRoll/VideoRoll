/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, computed } from "vue";
import { GlobeOutline, LayersOutline } from "@vicons/ionicons5";
import "./index.less";

export default defineComponent({
    name: "Info",
    setup() {

        return () => (
            <div>
                <div>
                    <GlobeOutline
                        class="video-roll-icon"
                    ></GlobeOutline>
                </div>
                <div>
                    <LayersOutline
                        class="video-roll-icon"
                    ></LayersOutline>
                </div>
            </div>
        );
    },
});
