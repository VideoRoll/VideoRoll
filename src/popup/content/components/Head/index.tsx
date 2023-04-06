/*
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { OptionsSharp, CloseSharp } from "@vicons/ionicons5";
import "./index.less";

export default defineComponent({
    name: "Head",
    props: {
        isShow: Boolean
    },
    setup(props) {
        const onOpenSetting = inject("onOpenSetting") as () => void;
        return () => (
            <div class="video-roll-header">
                <div class="video-roll-logo">
                    <img
                        class="video-roll-logo-text"
                        src="../../icons/text.png"
                    />
                </div>
                <div class="video-roll-head-right">
                    <div class="video-roll-setting-btn" title="refresh">
                        <CloseSharp
                            class="options-sharp"
                        ></CloseSharp>
                    </div>
                    <div
                        class="video-roll-setting-btn"
                        title="settings"
                        onClick={onOpenSetting}
                    >
                        {
                            props.isShow ? <CloseSharp
                                class="options-sharp"
                            ></CloseSharp> : <OptionsSharp
                                class="options-sharp"
                            ></OptionsSharp>
                        }
                    </div>
                </div>
            </div>
        );
    }
});
