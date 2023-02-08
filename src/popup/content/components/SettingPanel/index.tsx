/*
 * @description: settingpanel Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import {
    defineComponent,
    ref,
    defineAsyncComponent,
    resolveComponent,
    h,
} from "vue";
import { useComponents } from "../../use";
import "./index.less";

export default defineComponent({
    name: "SettingPanel",
    setup() {
        const components = useComponents();

        const active = ref(0);

        return () => (
            <div class="video-roll-setting-panel">
                <van-config-provider theme="dark">
                    <van-sidebar v-model={active.value}>
                        {components.map((item) => (
                            <van-sidebar-item
                                key={item.title}
                                title={item.title}
                            />
                        ))}
                    </van-sidebar>
                </van-config-provider>
                <van-config-provider class="setting-content-box" theme="dark">
                    <div class="setting-content">
                        {h(resolveComponent(components[active.value].title))}
                    </div>
                </van-config-provider>
            </div>
        );
    },
    components: {
        About: defineAsyncComponent(() => import("../About")),
        Flip: defineAsyncComponent(() => import("../Flip")),
        Zoom: defineAsyncComponent(() => import("../Zoom")),
        Scale: defineAsyncComponent(() => import("../Scale")),
        Store: defineAsyncComponent(() => import("../Store")),
        Filter: defineAsyncComponent(() => import("../Filter")),
        Move: defineAsyncComponent(() => import("../Move")),
        Audio: defineAsyncComponent(() => import("../Audio"))
    },
});
