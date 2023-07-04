/*
 * @description: grid Component
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

export default defineComponent({
    name: "GridPanel",
    setup() {
        const components = useComponents();

        const active = ref(0);

        return () => (
            <div class="video-roll-setting-panel">
                <van-config-provider theme="dark">
                    <div class="video-roll-actions">
                        
                    </div>
                </van-config-provider>
                {/* <van-config-provider class="setting-content-box" theme="dark">
                    <div class="setting-content">
                        {h(resolveComponent(components[active.value].title))}
                    </div>
                </van-config-provider> */}
            </div>
            // <div class="video-roll-setting-panel">
            //     <van-config-provider theme="dark">
            //         <van-sidebar v-model={active.value}>
            //             {components.map((item) => (
            //                 item.new ?
            //                     <van-sidebar-item
            //                         key={item.title}
            //                         title={item.title}
            //                         badge="new"
            //                     />
            //                     : <van-sidebar-item
            //                         key={item.title}
            //                         title={item.title}
            //                     />

            //             ))}
            //         </van-sidebar>
            //     </van-config-provider>
            //     <van-config-provider class="setting-content-box" theme="dark">
            //         <div class="setting-content">
            //             {h(resolveComponent(components[active.value].title))}
            //         </div>
            //     </van-config-provider>
            // </div>
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
        Pitch: defineAsyncComponent(() => import("../Pitch")),
        Focus: defineAsyncComponent(() => import("../Focus"))
    },
});
