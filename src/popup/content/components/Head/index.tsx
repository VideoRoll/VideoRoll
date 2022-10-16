/*
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, ref, inject } from "vue";
import { InformationCircle, SettingsSharp } from "@vicons/ionicons5";
import "./index.less";

export default defineComponent({
    name: "Head",
    setup() {
        const onOpenSetting = inject("onOpenSetting");
        return () => (
            <div class="video-roll-header">
                <div class="video-roll-logo">
                    <img
                        class="video-roll-logo-text"
                        src="../../icons/text.png"
                    />
                </div>
                <div class="video-roll-head-right">
                    <div
                        class="video-roll-setting-btn"
                        title="settings"
                        onClick={onOpenSetting}
                    >
                        <settings-sharp
                            class="settings-sharp"
                            color="#fffff"
                        ></settings-sharp>
                    </div>
                </div>
            </div>
        );
    },
    components: {
        InformationCircle,
        SettingsSharp,
    },
});
